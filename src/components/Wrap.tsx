import React from 'react'
import { css } from '@emotion/core'

export default ({ children }: { children: React.ReactElement }) => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 1600px;
      padding: 0 16px;

      @media (min-width: 641px) {
        padding: 0 32px;
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
