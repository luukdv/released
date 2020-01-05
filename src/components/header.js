import React from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'

export default React.memo(() => (
  <div
    css={css`
      max-width: 1520px;
      margin: 0 auto;
      overflow: hidden;
    `}
  >
    <img
      src="/header.png"
      srcSet="/header@2x.png 2x"
      alt=""
      css={css`
        display: block;
        margin-left: -50%;
        width: 200%;
        ${scale(3.5, 'margin-bottom')}
        ${scale(1.5, 'margin-top')}

        @media(min-width: 481px) {
          margin-left: -25%;
          width: 150%;
        }

        @media (min-width: 801px) {
          margin-left: 0;
          padding: 0 30px;
          width: 100%;
        }

        @media (min-width: 1551px) {
          padding: 0;
        }
      `}
    />
  </div>
))
