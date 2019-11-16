import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default ({ children }) => (
  <div
    css={css`
      ${scale(3, 'margin-bottom')}
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 1200px;
        padding-left: 20px;
        padding-right: 20px;

        @media (min-width: 641px) {
          padding-left: 40px;
          padding-right: 40px;
        }
      `}
    >
      {children}
    </div>
  </div>
)
