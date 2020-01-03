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

      const user = auth.currentUser()
      const token = user ? await user.jwt() : null
      const userData = token ? user : false
      setUser(userData)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (! user) {
      return
    }

    setLabels(user.user_metadata.labels ? user.user_metadata.labels : [])
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const persistLabels = newLabels => {
    if (! user) {
      return
    }

    user.update({
      data: {
        labels: newLabels,
      },
    })
  }

  const updateRelease = async label => {
    if (label.checked && Date.now() < label.checked + threeHours) {
      return
    }

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

    setLabels(prevLabels => {
      const next = prevLabels.map(prevLabel => {
        if (prevLabel.id === label.id) {
          const release = {
            artist: latest.response.release
              ? encodeURIComponent(strip(latest.response.release.artist))
              : null,
            img: latest.response.release ? latest.response.release.img : null,
            link: latest.response.release
              ? latest.response.release.link
              : null,
            title: latest.response.release
              ? encodeURIComponent(latest.response.release.title)
              : null,
          }

          return {
            ...prevLabel,
            checked: Date.now(),
            release,
          }
        }

        return label
      })

      return next
    })
    setUpdating(false)
  }

  return (
    <State.Provider
      value={{ error, labels, persistLabels, setLabels, setUser, updating, user }}
    >
      <App />
    </State.Provider>
  )
})
