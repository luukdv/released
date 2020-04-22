import React from 'react'
import { css, Interpolation } from '@emotion/core'
import scale from '../scale'

export default ({ children, styles, top }: {
  children: string | React.ReactElement
  styles?: Interpolation
  top?: boolean
}) => (
  <p
    css={[
      styles,
      css`
        color: rgb(80, 80, 80);
        font-style: italic;
        margin-${top ? 'bottom' : 'top'}: 2em;
        ${scale(1.125, 'font-size')}
      `,
    ]}
  >
    {children}
  </p>
)
