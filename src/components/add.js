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
  const [loading, setLoading] = useState(true)

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

    if (!value) {
      return
    }

    delayed = setTimeout(() => search(), 250)
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
            padding: 1em;
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
