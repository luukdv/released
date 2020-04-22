import React, { useContext } from 'react'
import scale from '../scale'
import { css } from '@emotion/core'
import Release from './Release'
import Notice from './Notice'
import State from '../context/State'
import { Label } from '../types'

export default () => {
  const { labels, updating, error } = useContext(State)

  const none = !labels.length
  const nonEmpty = labels.filter(
    (label: Label) => label.release.artist && label.release.title
  )
  const onlyEmpty = !nonEmpty.length

  return (
    <>
      <h2
        css={css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      >
        {updating ? `Checking ${updating}…` : 'Latest releases'}
      </h2>
      {error && <Notice top>{error}</Notice>}
      {!error && !updating && (none || onlyEmpty) && (
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
      {!onlyEmpty && (
        <>
          <div>
            {nonEmpty
              .sort((f: Label, s: Label) => (f.release.title > s.release.title ? 1 : -1))
              .map((label: Label) => (
                <Release key={label.id} data={label} />
              ))}
          </div>
        </>
      )}
    </>
  )
}
