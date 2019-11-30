import React from 'react'
import { css } from '@emotion/core'
import Label from './label'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { labels } = useContext(State)

  return (
    !!labels.length && (
      <>
        <h3>Saved labels</h3>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            margin-bottom: -0.75em;
          `}
        >
          {labels
            .sort((f, s) => (f.name > s.name ? 1 : -1))
            .map(label => (
              <Label name={label.name} key={label.id} id={label.id} />
            ))}
        </div>
      </>
    )
  )
})
