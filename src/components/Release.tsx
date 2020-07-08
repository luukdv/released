import scale from '../scale'
import React from 'react'
import { css } from '@emotion/core'
import { Label } from '../types'

export default ({ data }: { data: Label }) => (
  <div
    css={css`
      display: flex;
      ${scale(1.125, 'font-size')}

      &:not(:last-of-type) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }
    `}
  >
    <a
      css={css`
        align-items: center;
        padding: 0.75em 1em 0.75em 0;
        text-decoration: none;
        display: flex;
        flex-grow: 1;
        transition: background-color 0.2s ease-out;

        &:hover {
          background: rgb(240, 240, 240);
        }
      `}
      href={`https://www.discogs.com${data.release!.link}`}
      target="_blank"
      rel="noreferrer noopener nofollow"
    >
      <div
        css={css`
          flex-shrink: 0;
          ${scale(2, 'margin-right')}
          ${scale(3.5, 'width')}
        `}
      >
        <div
          css={css`
            border-radius: 3px;
            width: 100%;
            padding-bottom: 100%;
            background: ${data.release!.img
              ? `url('${data.release!.img}') rgb(230, 230, 230)`
              : 'rgb(230, 230, 230)'};
            background-size: cover;
            background-position: 50%;
          `}
        />
      </div>
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        <div
          css={css`
            font-weight: 700;
            margin-bottom: 0.25em;
          `}
        >
          {decodeURIComponent(data.release!.title)}
        </div>
        <div>{decodeURIComponent(data.release!.artist)}</div>
      </div>
    </a>
    <a
      target="_blank"
      rel="noreferrer noopener nofollow"
      css={css`
        padding: 1.25em 0;
        display: flex;
        align-items: stretch;
        flex-shrink: 0;
        transition: background-color 0.2s ease-out;

        &:hover {
          background: rgb(240, 240, 240);
        }
      `}
    >
      <div
        css={css`
          border-left: 1px solid rgb(220, 220, 220);
          display: flex;
          align-items: center;
          padding: 0 1em;
        `}
      >
        <svg
          css={css`
            height: 1em;
            width: 1em;
            display: block;
          `}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
    </a>
  </div>
)
