import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default React.memo(({ artist, title, image }) => (
  <a
    href=""
    css={css`
      align-items: center;
      display: flex;
      padding: 0.75em 0;
      position: relative;
      text-decoration: none;
      ${scale(1.125, 'font-size')}

      @media (min-width: 481px) {
        padding: 0.67em 0;
      }

      &:not(:last-child) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }

      &:last-child {
        padding-bottom: 0;
      }

      > div {
        flex: none;
      }
    `}
  >
    <div
      css={css`
        display: none;
        width: 6%;

        @media (min-width: 481px) {
          display: block;
        }
      `}
    >
      <div
        css={css`
          border-radius: 3px;
          width: 100%;
          padding-bottom: 100%;
          background: ${image
            ? `url('${image}') rgb(230, 230, 230)`
            : 'rgb(230, 230, 230)'};
          background-size: cover;
          background-position: 50%;
        `}
      />
    </div>
    <div
      css={css`
        font-weight: 700;
        width: 50%;

        @media (min-width: 481px) {
          padding-left: 1.5em;
        }
      `}
    >
      {decodeURIComponent(title)}
    </div>
    <div
      css={css`
        padding-left: 1.5em;
        width: ${100 - 50}%;

        @media (min-width: 481px) {
          width: ${100 - 50 - 6}%;
        }
      `}
    >
      {decodeURIComponent(artist)}
    </div>
  </a>
))
