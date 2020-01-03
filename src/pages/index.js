import App from '../components/app'
import auth, { getParams } from '../../auth'
import get from '../get'
import React, { useState, useEffect } from 'react'
import State from '../context/state'
import strip from '../../strip'
import { navigate } from '@reach/router'

const updateInterval = 3000

export default React.memo(() => {
  const [error, setError] = useState()
  const [labels, setLabels] = useState([])
  const [updating, setUpdating] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const params = getParams()

      if (params) {
        try {
          await auth.createUser(params, true)
        } catch (e) {}

        navigate('/', { replace: true })
      }

      const current = auth.currentUser()
      const token = current ? await current.jwt() : null
      const userData = token ? current : false

      setUser(userData)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (! user) {
      setLabels([])

      return
    }

    const savedLabels = user.user_metadata.labels ? user.user_metadata.labels : []
    const orderedLabels = savedLabels.sort((f, s) => f.checked > s.checked ? 1 : -1)

    setLabels(savedLabels)

    for (let i = 0; i < orderedLabels.length; i++) {
      let label = orderedLabels[i]

      setTimeout(() => update(label), i * updateInterval)
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = async label => {
    setError(false)
    setUpdating(decodeURIComponent(label.name))

    let latest

    try {
      latest = await get(`.netlify/functions/searchLabels?label=${label.name}`)
    } catch (e) {
      setError(true)
      setUpdating(false)
      return
    }

    const data = latest.response.release

    setLabels(prevLabels => {
      const next = prevLabels.map(prevLabel => {
        if (prevLabel.id !== label.id) {
          return prevLabel
        }

        const release = data ? {
          artist: encodeURIComponent(strip(data.artist)),
          img: data.img,
          link: data.link,
          title: encodeURIComponent(data.title),
        } : prevLabel.release

        return { ...prevLabel, checked: Date.now(), release }
      })

      persist(next)

      return next
    })
    setUpdating(false)
  }

  const persist = newLabels => {
    if (! user) {
      return
    }

    user.update({
      data: {
        labels: newLabels,
      },
    })
  }

  return (
    <State.Provider
      value={{ error, labels, persist, setLabels, setUser, update, updating, user }}
    >
      <App />
    </State.Provider>
  )
})
