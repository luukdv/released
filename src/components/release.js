import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default React.memo(({ artist, title, label, image }) => (
  <div
    css={css`
      align-items: center;
      display: flex;
      padding: 0.75em 0;
      position: relative;
      ${scale(1.25, 'font-size')}

      &:not(:last-child) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }

      &:last-child {
        padding-bottom: 0;
      }

      div {
        flex-grow: 0;
        flex-shrink: 0;
      }
    `}
  >
    <div
      css={css`
        display: none;
        padding-right: 1.5em;
        width: 11.25%;

        @media (min-width: 481px) {
          display: block;
        }
      `}
    >
      <div
        css={css`
          border-radius: 0.25em;
          width: 100%;
          padding-bottom: 100%;
          background: ${image ? `url('${image}') rgb(230, 230, 230)` : 'rgb(230, 230, 230)'};
          background-size: cover;
          background-position: 50%;
        `}
      />
    </div>
    <div
      css={css`
        font-weight: 700;
        padding-right: 1.5em;
        width: 55%;

        @media (min-width: 481px) {
          width: 50%;
        }
      `}
    >
      {title}
    </div>
    <div
      css={css`
        width: 45%;

        @media (min-width: 481px) {
          width: 38.875%;
        }
      `}
    >
      {artist}
    </div>
  </div>
))
