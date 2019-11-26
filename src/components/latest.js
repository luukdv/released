import React from 'react'
import Release from './release'
import { useContext, useEffect, useState } from 'react'
import State from '../context/state'
import get from '../get'

export default React.memo(() => {
  const [releases, setReleases] = useState([])
  const [error, setError] = useState([])
  const { labels } = useContext(State)

  useEffect(() => {
    setError(false)

    if (!labels.length) {
      return
    }

    ;(async () => {
      let data = []

      try {
        for (const label of labels) {
          const newest = await get(
            // eslint-disable-next-line no-undef
            `${API_ENDPOINT}?label=${label.name}&year=2019${
              process.env.NODE_ENV === 'development' ? '&dev=1' : ''
            }`
          )

          if (newest.response.length) {
            data.push({ ...newest.response[0], labelName: label.name })
          }
        }

        if (data.length) {
          setReleases(data)
        }
      } catch (e) {
        setError(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels])

  return (
    <>
      <h2>Latest albums</h2>
      {!!releases.length &&
        releases.map(release => (
          <Release
            key={release.id}
            title={release.title.split(' - ')[1]}
            artist={release.title.split(' - ')[0]}
            label={release.labelName}
            image={release.thumb}
          />
        ))}
    </>
  )
})
