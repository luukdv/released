import scale from '../../scale'
import React from 'react'
import { Global, css } from '@emotion/core'

export default () => (
  <Global
    styles={css`
      html {
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        line-height: 2;
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
        ${scale(3, 'margin-top', true)}
      }

      h1,
      h2,
      h3 {
        line-height: 1.5;
        margin-top: 0;
      }

      h2 {
        font-weight: 400;
        margin-bottom: 0.15em;
        ${scale(2.5, 'font-size')}
      }
    `}
  />
)
