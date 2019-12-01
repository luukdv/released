import React from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'

export default React.memo(() => (
  <div
    css={css`
      color: rgb(80, 80, 80);
      display: flex;
      text-align: center;
      width: 100%;
      ${scale(1, 'font-size')}
      ${scale(5, 'padding-bottom')}

      a {
        color: rgb(80, 80, 80);
      }
    `}
  >
    <a
      css={css`
        margin-right: 1em;
      `}
      target="_blank"
      href="https://www.luuk.site"
      rel="noopener noreferrer"
    >
      Contact
    </a>
    •
    <div
      css={css`
        margin-left: 1em;
      `}
    >
      Header illustration by{' '}
      <a
        target="_blank"
        href="https://www.stutpak.nl"
        rel="noopener noreferrer"
      >
        Stutpak
      </a>
    </div>
  </div>
))
