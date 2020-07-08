import scale from '../scale'
import React from 'react'
import { css } from '@emotion/core'
import { Label } from '../types'

export default ({ data }: { data: Label }) => (
  <a
    href={`https://www.discogs.com${data.release!.link}`}
    target="_blank"
    rel="noreferrer noopener nofollow"
    css={css`
      align-items: center;
      display: flex;
      line-height: 1.5;
      padding: 0.75em 0;
      position: relative;
      text-decoration: none;
      transition: background-color 0.2s ease-out;
      ${scale(1.125, 'font-size')}

      &:hover {
        background: rgb(240, 240, 240);
      }

      &:not(:last-of-type) {
        border-bottom: 2px solid rgb(220, 220, 220);
      }
    `}
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
        `}
      >
        {decodeURIComponent(data.release!.title)}
      </div>
      <div>{decodeURIComponent(data.release!.artist)}</div>
    </div>
  </a>
)
