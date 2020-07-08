import App from '../components/App'
import auth, { getParams } from '../auth'
import { get, post, setHeaders } from '../http'
import React, { useState, useEffect } from 'react'
import State from '../context/State'
import { navigate } from '@reach/router'
import { Labels, Label, User } from '../types'

const sixHours = 6 * 60 * 60 * 1000
const updateInterval = 3000
let lastUpdated = 0
let updater: NodeJS.Timeout

export default () => {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [labels, setLabels] = useState<Labels>([])
  const [updating, setUpdating] = useState('')
  const [user, setUser] = useState<User>(null)

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

      if (!currentUser || !currentUser.user_metadata) {
        setDone(true)
        return
      }

      try {
        const token = await currentUser.jwt()
        setUser(currentUser)
        setHeaders({ Authorization: `Bearer ${token}` })
      } catch (e) {
        setError(
          'Something went wrong while retrieving your login. You can try again later.'
        )
        setDone(true)
        return
      }

      let data

      try {
        data = await get(`/.netlify/functions/getLabels`)
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
    setUpdating('')
    clearTimeout(updater)
    setUser(null)
    setLabels([])

    if (user) {
      user.logout()
    }
  }

  useEffect(() => {
    if (!labels.length) {
      return
    }

    const label = (labels as Label[]).reduce((acc, curr) => {
      if (!acc.release) {
        return acc
      }

      if (!curr.release) {
        return curr
      }

      return acc.release.checked > curr.release.checked ? curr : acc
    })
    const stale =
      !label.release || label.release.checked + sixHours < Date.now()

    clearTimeout(updater)

    if (stale) {
      const delay = lastUpdated + updateInterval > Date.now()

      if (delay) {
        updater = setTimeout(() => update(label), updateInterval)
      } else {
        update(label)
      }
    }
  }, [labels]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = async (label: Label) => {
    lastUpdated = Date.now()

    setError('')
    setUpdating(decodeURIComponent(label.name))

    let data

    try {
      data = await get(
        `/.netlify/functions/getLatestRelease?name=${label.name}`
      )
    } catch (e) {
      setError(
        "Something went wrong wile checking for new releases. We'll keep trying."
      )
      setUpdating('')
      return
    }

    const { response: release } = data

    setLabels((prevLabels: Label[]) =>
      prevLabels.map((prevLabel) =>
        prevLabel.id === label.id ? { ...prevLabel, release } : prevLabel
      )
    )
    setUpdating('')

    if (release) {
      try {
        await post('/.netlify/functions/updateLabel', {
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
}
