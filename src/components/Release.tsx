import scale from '../scale'
import React from 'react'
import { css } from '@emotion/core'

export default React.memo(({ data }) => (
  <a
    href={`https://www.discogs.com${data.release.link}`}
    target="_blank"
    rel="noreferrer noopener nofollow"
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

      &:hover .release-label {
        opacity: 1;
        pointer-events: auto;
      }

      &:not(:last-of-type) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }

      &:first-of-type {
        padding-top: 0;
      }

      &:last-of-type {
        padding-bottom: 0;
      }

      > div {
        flex: none;
      }
    `}
  >
    <div
      className="release-label"
      css={css`
        background: rgb(235, 235, 235);
        padding: 0 1.5em;
        display: flex;
        opacity: 0;
        pointer-events: none;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: opacity 0.2s ease-out;
        will-change: opacity;
        left: 0;
        position: absolute;
        top: 0;
      `}
    >
      <div>
        Release on{' '}
        <span
          css={css`
            font-weight: 700;
          `}
        >
          {decodeURIComponent(data.name)}
        </span>
      </div>
    </div>
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
          background: ${data.release.img
            ? `url('${data.release.img}') rgb(230, 230, 230)`
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
      {decodeURIComponent(data.release.title)}
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
      {decodeURIComponent(data.release.artist)}
    </div>
  </a>
))
