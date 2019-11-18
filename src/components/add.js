import React from 'react'
import { css } from '@emotion/core'

export default () => (
  <>
    <h2>Add new label</h2>
    <div
      css={css`
        position: relative;
      `}
    >
      <input type="text" />
    </div>
  </>
)
