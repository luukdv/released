import React, { useState, useEffect, useContext } from 'react'
import scale from '../scale'
import { css } from '@emotion/core'
import { get } from '../http'
import Loading from './Loading'
import Results from './Results'
import State from '../context/State'
import type { Labels, Label } from '../types'

let value = ''
let delayed: NodeJS.Timeout | null

export default () => {
  const [results, setResults] = useState<Labels>([])
  const [done, setDone] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [loading, setLoading] = useState(false)
  const { labels } = useContext(State)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const add = document.getElementById('add')

      if (add && !add.contains(e.target as HTMLInputElement)) {
        clear()
      }
    })
  }, [])

  const clear = () => {
    const search = document.getElementById('search') as HTMLInputElement

    if (search) {
      search.value = ''
      setDone(false)
    }
  }

  const search = async () => {
    let data

    try {
      data = await get(`/.netlify/functions/searchLabel?query=${value}`, {
        identifier: value,
      })
    } catch (e) {
      setLoading(false)
      setDone(true)
      setSearchError(
        'Something went wrong while searching for labels. You can try again later.'
      )
      return
    }

    if (data.identifier === value) {
      setResults(
        data.response.results.filter((result: Label) => {
          return !(labels as Label[])
            .map((label) => label.id)
            .includes(result.id)
        })
      )
      setLoading(false)
      setDone(true)
    }
  }

  const onChange = () => {
    setDone(false)
    setSearchError('')

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
            spellCheck="false"
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
            onChange={(e) => {
              value = e.target.value
              onChange()
            }}
          />
          <Loading show={loading} />
        </div>
        <Results
          data={results}
          done={done}
          clear={clear}
          searchError={searchError}
        />
      </div>
      {!labels.length && (
        <p
          css={css`
            margin-top: 1.5em;
            ${scale(1.25, 'font-size')}
          `}
        >
          Once you've added some labels, we'll show them here.
        </p>
      )}
    </>
  )
}
