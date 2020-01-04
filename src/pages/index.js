import App from '../components/app'
import auth, { getParams } from '../../auth'
import get from '../get'
import React, { useState, useEffect } from 'react'
import State from '../context/state'
import strip from '../../strip'
import { navigate } from '@reach/router'

const updateInterval = 3000
const updates = []

export default React.memo(() => {
  const [done, setDone] = useState()
  const [error, setError] = useState()
  const [labels, setLabels] = useState([])
  const [updating, setUpdating] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    const params = getParams()

    ;(async () => {
      if (params) {
        try {
          await auth.createUser(params, true)
        } catch (e) {
          console.log('Failed to create user', e)
        }

        navigate('/', { replace: true })
      }

      const currentUser = auth.currentUser()

      setUser(currentUser ? currentUser : false)

      if (!currentUser) {
        setDone(true)
        return
      }

      let data

      try {
        data = await currentUser.getUserData()
      } catch (e) {
        console.log('Failed to retrieve data', e)
        setDone(true)
        return
      }

      const savedLabels = data.user_metadata.labels
        ? data.user_metadata.labels
        : []

      if (!savedLabels.length) {
        setDone(true)
        return
      }

      const orderedLabels = savedLabels.sort((f, s) =>
        f.checked > s.checked ? 1 : -1
      )

      setLabels(savedLabels)
      setDone(true)

      for (let i = 0; i < orderedLabels.length; i++) {
        let label = orderedLabels[i]
        const timeout = setTimeout(() => update(label), i * updateInterval)

        updates.push(timeout)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) {
      return
    }

    user.update({
      data: { labels },
    })
  }, [labels]) // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    setLabels([])
    setUpdating(false)
    updates.forEach(u => clearTimeout(u))

    setUser(false)
    user.logout()
  }

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

    setLabels(prevLabels =>
      prevLabels.map(prevLabel => {
        if (prevLabel.id !== label.id) {
          return prevLabel
        }

        const release = data
          ? {
              artist: encodeURIComponent(strip(data.artist)),
              img: data.img,
              link: data.link,
              title: encodeURIComponent(data.title),
            }
          : prevLabel.release

        return { ...prevLabel, checked: Date.now(), release }
      })
    )
    setUpdating(false)
  }

  return (
    <State.Provider
      value={{
        done,
        error,
        labels,
        logout,
        setLabels,
        update,
        updating,
        user,
      }}
    >
      <App />
    </State.Provider>
  )
})
