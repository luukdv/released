import React, { useState, useEffect } from 'react'
import scale from '../../scale'
import { css } from '@emotion/core'
import get from '../get'
import Loading from './loading'
import Results from './results'
import env from '../../env'

let value = ''
let delayed

export default React.memo(() => {
  const [results, setResults] = useState([])
  const [done, setDone] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const listener = document.addEventListener('click', e => {
      if (!document.getElementById('add').contains(e.target)) {
        clear()
      }
    })

    return document.removeEventListener('click', listener)
  }, [])

  const clear = () => {
    document.getElementById('search').value = ''
    setDone(false)
  }

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
    setDone(false)

    if (value.length > 2) {
      setLoading(true)
    }

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
      <h2>Add label</h2>
      <div
        id="add"
        css={css`
          margin-bottom: 3.5em;
          position: relative;
        `}
      >
        <div
          css={css`
            ${scale(1.25, 'font-size')}
          `}
        >
          <input
            autoComplete="off"
            id="search"
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
          />
          <Loading show={loading} />
        </div>
        <Results data={results} show={done} clear={clear} />
      </div>
    </>
  )
})
