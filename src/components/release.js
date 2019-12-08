import scale from '../../scale'
import React from 'react'
import { css } from '@emotion/core'

export default React.memo(({ data }) => {
  return (
    <a
      href={`https://www.discogs.com${data.link}`}
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
        className="release-label"
        css={css`
          background: rgb(235, 235, 235);
          padding-left: 1.5em;
          display: flex;
          opacity: 0;
          pointer-events: none;
          align-items: center;
          width: 100%;
          height: 100%;
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
          ></span>
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
            background: ${data.img
              ? `url('${data.img}') rgb(230, 230, 230)`
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
        {decodeURIComponent(data.title)}
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
        {decodeURIComponent(data.artist)}
      </div>
    </a>
  )
})
