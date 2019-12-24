import React from 'react'
import { css } from '@emotion/core'

export default React.memo(({ children }) => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 1600px;
      padding: 0 20px;

      @media (min-width: 641px) {
        padding: 0 40px;
      }

      @media (min-width: 961px) {
        display: flex;
        justify-content: space-between;
      }
    `}
  >
    {children}
  </div>
))
