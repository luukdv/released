import React from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
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
      const release = existing.length ? existing[0] : null

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
          artist: latest.response.release
            ? latest.response.release.artist
            : null,
          checked: Date.now(),
          labelId: label.id,
          img: latest.response.release ? latest.response.release.img : null,
          labelName: label.name,
          title: latest.response.release ? latest.response.release.title : null,
        }

        setReleases(prevReleases => {
          return release
            ? prevReleases.map(r => {
                return r.labelId === label.id ? newRelease : r
              })
            : [...prevReleases, newRelease]
        })
      } catch (e) {
        console.log(e)
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
      {!!releases.length && (
        <div>
          {releases
            .filter(release => release.artist && release.title)
            .sort((f, s) => (f.title > s.title ? -1 : 1))
            .map(release => (
              <Release
                key={release.labelId}
                title={release.title}
                artist={release.artist}
                label={release.labelName}
                image={release.img}
              />
            ))}
        </div>
      )}
      {!!releases.length && (
        <p
          css={css`
            color: rgb(80, 80, 80);
            font-style: italic;
            margin-top: 2em;
            ${scale(1.125, 'font-size')}
          `}
        >
          Releases are updated every hour.
        </p>
      )}
      {!releases.length && (
        <p
          css={css`
            ${scale(1.25, 'font-size')}
          `}
        >
          {
            "Nothing to show yet 💁‍♂️. Add some labels and we'll check their latest release."
          }
        </p>
      )}
    </>
  )
})
