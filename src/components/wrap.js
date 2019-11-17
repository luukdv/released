import React from 'react'
import { css } from '@emotion/core'

export default ({ children }) => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 1600px;
      padding-left: 20px;
      padding-right: 20px;

      @media (min-width: 641px) {
        padding-left: 40px;
        padding-right: 40px;
      }

      @media (min-width: 961px) {
        display: flex;
        justify-content: space-between;
      }
    `}
  >
    {children}
  </div>
)
