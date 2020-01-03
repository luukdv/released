import App from '../components/app'
import auth, { getParams } from '../../auth'
import get from '../get'
import React, { useState, useEffect } from 'react'
import State from '../context/state'
import strip from '../../strip'
import { navigate } from '@reach/router'

const threeHours = 3 * 60 * 60 * 1000

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

    setLabels(user.user_metadata.labels ? user.user_metadata.labels : [])
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const update = async label => {
    setError(false)
    setUpdating(true)

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

        const release = {
          artist: data ? encodeURIComponent(strip(data.artist)) : null,
          img: data ? data.img : null,
          link: data ? data.link : null,
          title: data ? encodeURIComponent(data.title) : null,
        }

        return {
          ...prevLabel,
          checked: Date.now(),
          release,
        }
      })

      return next
    })
    setUpdating(false)
  }

  return (
    <State.Provider
      value={{ error, labels, persist, setLabels, setUser, update, updating, user }}
    >
      <App />
    </State.Provider>
  )
})
