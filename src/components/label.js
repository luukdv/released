import React, { useContext } from 'react'
import { css } from '@emotion/core'
import State from '../context/state'

export default React.memo(({ data }) => {
  const { setLabels, setReleases } = useContext(State)

  const remove = () => {
    setLabels(prevLabels => {
      const newLabels = prevLabels.filter(label => label.id !== data.id)

      window.localStorage.setItem('labels', JSON.stringify(newLabels))
      return newLabels
    })
    setReleases(prevReleases => {
      const newReleases = prevReleases.filter(
        release => release.labelId !== data.id
      )

      window.localStorage.setItem('releases', JSON.stringify(newReleases))
      return newReleases
    })
  }

  return (
    <div
      css={css`
        font-weight: 700;
        margin: 0 0.75em 0.75em 0;
        position: relative;
        user-select: none;

        &:hover .remove {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
      `}
    >
      <a
        href={`https://www.discogs.com${data.link}?layout=sm&limit=500`}
        target="_blank"
        rel="noreferrer noopener nofollow"
        css={css`
          background: rgb(160, 160, 160);
          will-change: background-color;
          display: block;
          border-radius: 9em;
          text-decoration: none;
          color: white;
          transition: background-color 0.2s ease-out;
          text-align: center;
          padding: 0.5em 1em;

          &:hover {
            background: rgb(120, 120, 120);
          }
        `}
      >
        {decodeURIComponent(data.name)}
      </a>
      <div
        role="button"
        tabIndex={0}
        onKeyUp={e => (e.key === 13 || e.keyCode === 13) && remove()}
        onClick={remove}
        className="remove"
        css={css`
          background: rgb(255, 40, 80);
          display: flex;
          align-items: center;
          color: white;
          justify-content: center;
          transform: scale(0.5) translate(-1em, 1em);
          transition: transform 0.2s ease-out;
          width: 2em;
          height: 2em;
          pointer-events: none;
          opacity: 0;
          border-radius: 50%;
          position: absolute;
          cursor: pointer;
          top: -0.75em;
          right: -0.75em;
          z-index: 1;
        `}
      >
        ✕
      </div>
    </div>
  )
})
