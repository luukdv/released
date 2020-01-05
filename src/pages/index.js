import App from '../components/app'
import auth, { getParams } from '../../auth'
import get from '../get'
import React, { useState, useEffect } from 'react'
import State from '../context/state'
import strip from '../../strip'
import { navigate } from '@reach/router'

const updateInterval = 3000
let lastUpdated = 0
let updater

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
        } catch (e) {}

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
        setDone(true)
        return
      }

      const savedLabels = data.user_metadata.labels
        ? data.user_metadata.labels
        : []

      setDone(true)

      if (!savedLabels.length) {
        return
      }

      setLabels(savedLabels)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (labels.length) {
      runUpdater()
    }

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
    clearTimeout(updater)
    setUser(false)
    user.logout()
  }

  const runUpdater = () => {
    const label = labels.reduce((acc, curr) => {
      if (!acc.checked) {
        return acc
      }

      if (!curr.checked) {
        return curr
      }

      return acc.checked > curr.checked ? curr : acc
    })
    const threeHours = 3 * 60 * 60 * 1000
    const stale = label.checked + threeHours < Date.now()

    clearTimeout(updater)

    if (!label.checked || stale) {
      const delay = lastUpdated + updateInterval > Date.now()

      if (delay) {
        updater = setTimeout(() => update(label), updateInterval)
      } else {
        update(label)
      }
    }
  }

  const update = async label => {
    lastUpdated = Date.now()

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
        updating,
        user,
      }}
    >
      <App />
    </State.Provider>
  )
})
