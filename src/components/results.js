import React from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(({ data, show, clear }) => {
  const { labels, setLabels } = useContext(State)

  return (
    <div
      css={css`
        background: white;
        left: 0;
        display: ${show ? 'block' : 'none'};
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
      {!!data.length &&
        data.map(result => (
          <div
            css={css`
              padding: 1em 1.25em;
              transition: background-color 0.2s ease-out;

              &:not(:last-child) {
                border-bottom: 1px solid rgb(220, 220, 220);
              }

              &:hover {
                background: rgb(240, 240, 240);
              }
            `}
            key={result.id}
            onClick={() => {
              setLabels([...labels, { id: result.id, name: result.title }])
              clear()
            }}
          >
            {result.title}
          </div>
        ))}
    </div>
  )
})
