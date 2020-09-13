import App from './components/App'
import auth, { getParams } from './auth'
import { get, post, setHeaders } from './http'
import React, { useState, useEffect } from 'react'
import State from './context/State'
import type { Labels, Label, User } from './types'
import { render } from 'react-dom'
import { initAnalytics } from './analytics'

const sixHours = 6 * 60 * 60 * 1000
const updateInterval = 3000
let lastUpdated = 0
let updater: NodeJS.Timeout

const Provider = () => {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [labels, setLabels] = useState<Labels>([])
  const [updating, setUpdating] = useState('')
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    initAnalytics()
  }, [])

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

        window.history.replaceState(null, '', '/')
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
          'You have been logged out from Google, probably because your login was expired. You can log in again to see your releases.'
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
  }, [])

  useEffect(() => {
    if (!labels.length) {
      return
    }

    updateBatch(labels)
  }, [labels])

  const logout = () => {
    setUpdating('')
    clearTimeout(updater)
    setUser(null)
    setLabels([])

    if (user) {
      user.logout()
    }
  }

  const updateBatch = (labels: Label[]) => {
    const label = labels.reduce((acc, curr) => {
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
        updater = setTimeout(() => updateSingle(label), updateInterval)
      } else {
        updateSingle(label)
      }
    }
  }

  const updateSingle = async (label: Label) => {
    lastUpdated = Date.now()

    setError('')
    setUpdating(decodeURIComponent(label.name))

    try {
      const data = await get(
        `/.netlify/functions/getLatestRelease?name=${label.name}`
      )
      const { response: release } = data

      setUpdating('')
      setLabels((prevLabels: Label[]) =>
        prevLabels.map((prevLabel) => {
          if (prevLabel.id !== label.id) {
            return prevLabel
          }

          return { ...prevLabel, release }
        })
      )

      if (release) {
        post('/.netlify/functions/updateLabel', {
          data: { label: label.id, release },
        })
      }
    } catch (e) {
      setError(
        `Something went wrong wile checking for new releases from ${decodeURIComponent(
          label.name
        )}. We'll keep trying.`
      )
      setUpdating('')
      setLabels((prevLabels: Label[]) =>
        prevLabels.map((prevLabel) => {
          if (prevLabel.id !== label.id) {
            return prevLabel
          }

          return {
            ...prevLabel,
            release: { ...prevLabel.release, checked: Date.now() },
          }
        })
      )
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

render(<Provider />, document.getElementById('root'))
