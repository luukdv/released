import App from '../components/app'
import auth, { getParams } from '../../auth'
import { get, post } from '../http'
import React, { useState, useEffect } from 'react'
import State from '../context/state'
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
        } catch (e) {
          setError(
            'Something went wrong while logging in. You can try again later.'
          )
        }

        navigate('/', { replace: true })
      }

      const currentUser = auth.currentUser()
      const userObject =
        currentUser && currentUser.user_metadata ? currentUser : false

      setUser(userObject)

      if (!userObject) {
        setDone(true)
        return
      }

      let data

      try {
        data = await get(`.netlify/functions/getLabels?user=${userObject.id}`)
      } catch (e) {
        setError(
          'Something went wrong while retrieving your data. You can try again later.'
        )
        setDone(true)
        return
      }

      const { response: savedLabels } = data

      if (savedLabels.length) {
        setLabels(savedLabels)
      }

      setDone(true)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    setUpdating(false)
    clearTimeout(updater)
    setUser(false)
    setLabels([])
    user.logout()
  }

  useEffect(() => {
    if (!labels.length) {
      return
    }

    const label = labels.reduce((acc, curr) => {
      if (!acc.release.checked) {
        return acc
      }

      if (!curr.release.checked) {
        return curr
      }

      return acc.release.checked > curr.release.checked ? curr : acc
    })
    const sixHours = 6 * 60 * 60 * 1000
    const stale = label.release.checked + sixHours < Date.now()

    clearTimeout(updater)

    if (!label.release.checked || stale) {
      const delay = lastUpdated + updateInterval > Date.now()

      if (delay) {
        updater = setTimeout(() => update(label), updateInterval)
      } else {
        update(label)
      }
    }
  }, [labels]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = async label => {
    lastUpdated = Date.now()

    setError(false)
    setUpdating(decodeURIComponent(label.name))

    let data

    try {
      data = await get(
        `.netlify/functions/getLatestRelease?id=${label.id}&name=${label.name}`
      )
    } catch (e) {
      setError(
        "Something went wrong wile checking for new releases. We'll keep trying."
      )
      setUpdating(false)
      return
    }

    const { response: release } = data

    setLabels(prevLabels =>
      prevLabels.map(prevLabel =>
        prevLabel.id === label.id ? { ...prevLabel, release } : prevLabel
      )
    )
    setUpdating(false)

    if (release) {
      try {
        await post('.netlify/functions/updateLabel', {
          data: { label: label.id, release },
        })
      } catch (e) {}
    }
  }

  return (
    <State.Provider
      value={{
        done,
        error,
        labels,
        logout,
        setError,
        setLabels,
        updating,
        user,
      }}
    >
      <App />
    </State.Provider>
  )
})
