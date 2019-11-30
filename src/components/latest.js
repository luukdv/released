import React from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import Release from './release'
import { useContext, useEffect } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { labels, releases, updateRelease, updating } = useContext(State)

  useEffect(() => {
    for (const label of labels) {
      updateRelease(label)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const none = !releases.length
  const nonEmpty = releases.filter(release => release.artist && release.title)
  const onlyEmpty = !nonEmpty.length

  return (
    <>
      <h2>
        {updating
          ? 'Updating releases…'
          : `Latest from ${new Date().getFullYear()}`}
      </h2>
      {!onlyEmpty && (
        <>
          <div>
            {nonEmpty
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
        </>
      )}
      {!updating && (none || onlyEmpty) && (
        <p
          css={css`
            ${scale(1.25, 'font-size')}
          `}
        >
          {none
            ? "Nothing to show yet 💁‍♂️. Add some labels and we'll check their latest release."
            : "Nothing to show from this year so far 🤔. We'll keep checking for new releases."}
        </p>
      )}
    </>
  )
})
