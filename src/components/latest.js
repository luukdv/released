import React from 'react'
import Release from './release'
import { useContext, useEffect } from 'react'
import State from '../context/state'
import get from '../get'

const hour = 60 * 60 * 1000

export default React.memo(() => {
  const { labels, releases, setReleases } = useContext(State)

  const checkReleases = async () => {
    for (const label of labels) {
      const existing = releases.filter(r => r.labelId === label.id)
      const release = existing ? existing[0] : null

      if (release && release.checked && Date.now() < release.checked + hour) {
        continue
      }

      try {
        const latest = await get(
          // eslint-disable-next-line no-undef
          `${API_ENDPOINT}?label=${label.name}${
            process.env.NODE_ENV === 'development' ? '&dev=1' : ''
          }`
        )

        const newRelease = {
          checked: Date.now(),
          labelId: label.id,
          img: latest.response.length ? latest.response[0].thumb : null,
          labelName: label.name,
          name: latest.response.length ? latest.response[0].title : null,
        }

        setReleases(prevReleases => {
          return release
            ? prevReleases.map(r => {
                return r.labelId === label.id ? newRelease : r
              })
            : [...prevReleases, newRelease]
        })
      } catch (e) {
        return
      }
    }
  }

  useEffect(() => {
    checkReleases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels])

  return (
    <>
      <h2>Latest from {new Date().getFullYear()}</h2>
      {!!releases.length &&
        releases.map(release =>
          release.name ? (
            <Release
              key={release.labelId}
              title={release.name.split(' - ')[1]}
              artist={release.name.split(' - ')[0].replace(/(.+)\*$/, '$1')}
              label={release.labelName}
              image={release.img}
            />
          ) : null
        )}
    </>
  )
})
