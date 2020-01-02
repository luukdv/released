import React, { useContext } from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'
import strip from '../../strip'
import State from '../context/state'

export default React.memo(({ data, done, clear, error }) => {
  const {
    setLabels,
    setReleases,
    persistLabels,
    persistReleases,
    updateRelease,
  } = useContext(State)

  const add = result => {
    const label = {
      id: result.id,
      link: result.link,
      name: encodeURIComponent(strip(result.title)),
    }
    const release = { labelId: result.id }

    setLabels(prev => {
      const next = [...prev, label]

      persistLabels(next)

      return next
    })
    setReleases(prev => {
      const next = [...prev, release]

      persistReleases(next)

      return next
    })
    updateRelease(label, release)
    clear()
  }

  return (
    <div
      css={css`
        background: white;
        left: 0;
        display: ${done ? 'block' : 'none'};
        top: 100%;
        border-radius: 0.25em;
        box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
        position: absolute;
        width: 100%;
        cursor: pointer;
        z-index: 2;
        user-select: none;
        ${scale(1, 'font-size')}
      `}
    >
      {(error || !data.length) && (
        <div
          css={css`
            padding: 2em 1.25em;
            text-align: center;
          `}
        >
          {error
            ? 'Something went wrong 😔. You can try again later.'
            : 'No labels found that are not already added.'}
        </div>
      )}
      {!!data.length &&
        data.map((result, i) => (
          <div
            tabIndex={0}
            role="button"
            css={css`
              display: flex;
              align-items: center;
              padding: 1em 1.25em;
              transition: background-color 0.2s ease-out;
              will-change: background-color;

              &:not(:last-child) {
                border-bottom: 1px solid rgb(220, 220, 220);
              }

              &:hover {
                background: rgb(240, 240, 240);
              }
            `}
            key={result.id}
            onClick={() => add(result)}
            onKeyUp={e => (e.key === 13 || e.keyCode === 13) && add(result)}
          >
            <div
              css={css`
              background: url('${result.img}') rgb(230, 230, 230);
              border-radius: 3px;
              background-size: cover;
              background-position: 50%;
              height: 1.5em;
              flex-shrink: 0;
              flex-grow: 0;
              margin-right: 1em;
              width: 4.5em;
            `}
            ></div>
            <div>{result.title}</div>
          </div>
        ))}
    </div>
  )
})
