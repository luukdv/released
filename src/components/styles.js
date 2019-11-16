import scale from '../../scale'
import React from 'react'
import { Global, css } from '@emotion/core'

export default () => (
  <Global
    styles={css`
      html {
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        line-height: 1.5;
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
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
      }

      h2 {
        font-weight: 700;
        margin: 0 0 0.5em;
        ${scale(2.5, 'font-size')}
      }
    `}
  />
)
