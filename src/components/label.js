import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(({ name, id }) => {
  const { setLabels, setReleases } = useContext(State)

  const remove = () => {
    setLabels(prevLabels => {
      const newLabels = prevLabels.filter(label => label.id !== id)

      window.localStorage.setItem('labels', JSON.stringify(newLabels))
      return newLabels
    })
    setReleases(prevReleases => {
      const newReleases = prevReleases.filter(
        release => release.labelId !== id
      )

      window.localStorage.setItem('releases', JSON.stringify(newReleases))
      return newReleases
    })
  }

  return (
    <div
      css={css`
        color: white;
        font-weight: 700;
        margin: 0 0.75em 0.75em 0;
        position: relative;
        user-select: none;
        ${scale(1, 'font-size')}

        &:hover .remove {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
      `}
    >
      <div
        css={css`
          background: rgb(160, 160, 160);
          border-radius: 9em;
          text-align: center;
          padding: 0.5em 1em;
        `}
      >
        {name}
      </div>
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
