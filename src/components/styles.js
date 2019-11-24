import scale from '../../scale'
import React from 'react'
import { Global, css } from '@emotion/core'

export default React.memo(() => (
  <Global
    styles={css`
      html {
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 1.25;
      }

      * {
        box-sizing: inherit;
      }

      body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        color: rgb(40, 40, 40);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        margin-left: 0;
        margin-right: 0;
        ${scale(10, 'margin-bottom')}
        ${scale(20, 'margin-top')}
      }

      h2 {
        font-weight: 700;
        margin: 0 0 0.75em;
        ${scale(2.5, 'font-size')}
      }
    `}
  />
))
