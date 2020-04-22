import React from 'react'
import { css } from '@emotion/core'

export default ({ show = false }: { show: boolean }) => (
  <div
    css={css`
      right: 0;
      display: ${show ? 'flex' : 'none'};
      top: 0;
      align-items: center;
      padding: 0 1em;
      pointer-events: none;
      height: 100%;
      position: absolute;
    `}
  >
    <div
      css={css`
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        animation: rotate 0.8s ease-out infinite;
        border-bottom: 0.15em solid transparent;
        border-right: 0.15em solid rgb(120, 120, 120);
        border-left: 0.15em solid rgb(120, 120, 120);
        will-change: transform;
        border-top: 0.15em solid transparent;
        height: 1.5em;
        border-radius: 50%;
        width: 1.5em;
      `}
    ></div>
  </div>
)
