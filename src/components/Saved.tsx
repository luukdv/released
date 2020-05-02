import React, { useContext } from 'react'
import { css } from '@emotion/core'
import scale from '../scale'
import Tag from './Tag'
import State from '../context/State'

export default () => {
  const { labels } = useContext(State)

  if (!labels.length) {
    return null
  }

  return (
      <div
        css={css`
          ${scale(4, 'margin-top')}
        `}
      >
        <h3>Saved labels</h3>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            margin-bottom: -0.75em;
            ${scale(1, 'font-size')}
          `}
        >
          {labels
            .sort((f, s) => (f.name > s.name ? 1 : -1))
            .map((label) => (
              <Tag data={label} key={label.id} />
            ))}
        </div>
      </div>
    )
}
