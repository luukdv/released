import React from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'

export default React.memo(({ children, styles }) => (
  <p
    css={[
      styles,
      css`
        color: rgb(80, 80, 80);
        font-style: italic;
        margin-top: 2em;
        ${scale(1.125, 'font-size')}
      `,
    ]}
  >
    {children}
  </p>
))
