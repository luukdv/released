import React from 'react'
import { css } from '@emotion/core'
import scale from '../../scale'

export default React.memo(() => (
  <div
    css={css`
      color: rgb(80, 80, 80);
      text-align: center;
      width: 100%;
      ${scale(1, 'font-size')}
      ${scale(4, 'padding-bottom')}

      @media (min-width: 561px) {
        display: flex;
      }

      a {
        color: rgb(80, 80, 80);
      }

      > *:not(:last-child) {
        margin-bottom: 2em;

        @media (min-width: 561px) {
          margin-bottom: 0;
        }
      }
    `}
  >
    <div>Releases are updated every 3 hours</div>
    <Dot />
    <div>
      Header illustration by{' '}
      <a
        target="_blank"
        href="https://www.stutpak.nl"
        rel="noopener noreferrer"
      >
        Stutpak
      </a>
    </div>
    <Dot />
    <a
      css={css`
        display: block;
      `}
      target="_blank"
      href="https://www.luuk.site"
      rel="noopener noreferrer"
    >
      Contact
    </a>
  </div>
))

const Dot = () => (
  <div
    css={css`
      display: none;
      margin: 0 1em;

      @media (min-width: 561px) {
        display: block;
      }
    `}
  >
    •
  </div>
)
