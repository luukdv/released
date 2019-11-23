import React, { useState } from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import get from '../get'
import env from '../../env'

let value = ''
let delayed

export default () => {
  const [results, setResults] = useState([])
  const [done, setDone] = useState()
  const [loading, setLoading] = useState()

  const search = async () => {
    const results = await get(
      `${env.endpoint}?search=${value}${
        process.env.NODE_ENV === 'development' ? '&dev=1' : ''
      }`,
      value
    )

    if (results.token === value) {
      setResults(results.response)
      setLoading(false)
      setDone(true)
    }
  }

  const onChange = () => {
    setLoading(true)
    setDone(false)

    if (delayed) {
      clearTimeout(delayed)
      delayed = null
    }

    delayed = setTimeout(() => {
      if (value.length > 2) {
        search()
      } else {
        setLoading(false)
      }
    }, 250)
  }

  return (
    <>
      <h2>Add new label</h2>
      <div
        css={css`
          ${scale(1.25, 'font-size')}
          margin-bottom: 3.5em;
          position: relative;
        `}
      >
        <input
          css={css`
            background: rgb(250, 250, 250);
            border: 2px solid rgb(220, 220, 220);
            border-radius: 0.25em;
            font-size: inherit;
            width: 100%;
            font-family: inherit;
            padding: 1em 3.75em 1em 1em;
            -webkit-appearance: none;

            &:focus {
              border-color: rgb(200, 200, 200);
              outline: none;
            }
          `}
          type="text"
          onChange={e => {
            value = e.target.value
            onChange()
          }}
          onFocus={e => {
            value = ''
            e.target.value = ''
          }}
        />
        <div
          css={css`
            right: 1em;
            display: ${loading ? 'flex' : 'none'};
            top: 0;
            align-items: center;
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
              border-bottom: 0.2em solid transparent;
              border-right: 0.2em solid rgb(120, 120, 120);
              border-left: 0.2em solid rgb(120, 120, 120);
              border-top: 0.2em solid transparent;
              height: 1.75em;
              border-radius: 50%;
              width: 1.75em;
            `}
          ></div>
        </div>
        <div
          css={css`
            background: white;
            left: 0;
            display: ${done ? 'block' : 'none'};
            top: 100%;
            border-radius: 0.25em;
            box-shadow: 0 0.1em 0.5em rgba(0, 0, 0, 0.25);
            position: absolute;
            width: 100%;
          `}
        >
          {!!results.length &&
            results.map(result => <div key={result.id}>{result.title}</div>)}
        </div>
      </div>
    </>
  )
}
