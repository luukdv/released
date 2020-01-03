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
  const [releases, setReleases] = useState([])
  const [updating, setUpdating] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const params = getParams()

      if (params) {
        try {
          const test = await auth.createUser(params, true)
        } catch (e) {}

        navigate('/', { replace: true })
      }

      const user = auth.currentUser()
      const token = user ? await user.jwt() : null
      const userData = token ? user : false
      setUser(userData)

      const savedLabels =
        userData && user.user_metadata.labels ? user.user_metadata.labels : []
      const savedReleases =
        userData && user.user_metadata.labels ? user.user_metadata.releases : []

      setLabels(savedLabels)
      setReleases(savedReleases)

      for (const label of savedLabels) {
        const release = savedReleases.filter(r => r.labelId === label.id)[0]
        updateRelease(label, release)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const persistLabels = newLabels => {
    if (!user) {
      return
    }

    user.update({
      data: {
        labels: newLabels,
      },
    })
  }

  const persistReleases = newReleases => {
    if (!user) {
      return
    }

    user.update({
      data: {
        releases: newReleases,
      },
    })
  }

  const updateRelease = async (label, release) => {
    if (release.checked && Date.now() < release.checked + threeHours) {
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

    setReleases(prev => {
      const next = prev.map(release =>
        release.labelId === label.id
          ? {
              ...release,
              artist: latest.response.release
                ? encodeURIComponent(strip(latest.response.release.artist))
                : null,
              checked: Date.now(),
              img: latest.response.release ? latest.response.release.img : null,
              link: latest.response.release
                ? latest.response.release.link
                : null,
              title: latest.response.release
                ? encodeURIComponent(latest.response.release.title)
                : null,
            }
          : release
      )

      persistReleases(next)

      return next
    })
    setUpdating(false)
  }

  return (
    <State.Provider
      value={{
        error,
        labels,
        persistLabels,
        persistReleases,
        releases,
        setLabels,
        setReleases,
        setUser,
        updateRelease,
        updating,
        user,
      }}
    >
      <App />
    </State.Provider>
  )
})
