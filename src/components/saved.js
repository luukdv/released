import React from 'react'
import { css } from '@emotion/core'
import Label from './label'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { labels } = useContext(State)
  return (
    <>
      <h2>Saved labels</h2>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin-bottom: -0.75em;
        `}
      >
        {!!labels.length &&
          labels.map(label => <Label name={label.name} key={label.id} />)}
      </div>
    </>
  )
})
