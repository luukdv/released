import React from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import Release from './release'
import { useContext, useEffect } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { labels, releases, updateRelease } = useContext(State)

  useEffect(() => {
    for (const label of labels) {
      updateRelease(label)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2>Latest from {new Date().getFullYear()}</h2>
      {!!releases.length && (
        <div>
          {releases
            .filter(release => release.artist && release.title)
            .sort((f, s) => (f.title > s.title ? 1 : -1))
            .map(release => (
              <Release
                key={release.labelId}
                title={release.title}
                artist={release.artist}
                labelId={release.labelId}
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
