import React, { useContext } from 'react'
import { css } from '@emotion/core'
import scale from '../scale'
import { post } from '../http'
import State from '../context/State'
import type { Label } from '../types'

export default ({
  data,
  done,
  clear,
  searchError,
}: {
  data: Label[]
  done: boolean
  clear: () => void
  searchError: string
}) => {
  const { setLabels, user, setError } = useContext(State)

  const add = async (result: Label) => {
    setLabels((prev) => [...prev, result])
    clear()

    if (!user) {
      return
    }

    try {
      await post('/.netlify/functions/addUserToLabel', {
        data: { label: result },
      })
    } catch (e) {
      setError(
        'Something went wrong while saving data to your account. You can try again later.'
      )
    }
  }

  return (
    <div
      css={css`
        background: white;
        left: 0;
        display: ${done ? 'block' : 'none'};
        top: 100%;
        border-radius: 0.25em;
        box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
        position: absolute;
        width: 100%;
        cursor: pointer;
        z-index: 2;
        user-select: none;
        ${scale(1, 'font-size')}
      `}
    >
      {(searchError || !data.length) && (
        <div
          css={css`
            padding: 2em 1.25em;
            text-align: center;
          `}
        >
          {searchError
            ? searchError
            : 'No labels found that are not already added.'}
        </div>
      )}
      {!!data.length &&
        data.map((result) => (
          <div
            tabIndex={0}
            role="button"
            css={css`
              display: flex;
              align-items: center;
              padding: 1em 1.25em;
              transition: background-color 0.2s ease-out;
              will-change: background-color;

              &:not(:last-child) {
                border-bottom: 1px solid rgb(220, 220, 220);
              }

              &:hover {
                background: rgb(240, 240, 240);
              }
            `}
            key={result.id}
            onClick={() => add(result)}
            onKeyUp={(e) =>
              (e.key === 'Enter' || e.keyCode === 13) && add(result)
            }
          >
            <div
              css={css`
                background: url('${result.img}') rgb(220, 220, 220);
                border-radius: 3px;
                background-size: cover;
                background-position: 50%;
                height: 1.5em;
                flex-shrink: 0;
                flex-grow: 0;
                margin-right: 1em;
                width: 4.5em;
              `}
            ></div>
            <div>{decodeURIComponent(result.name)}</div>
          </div>
        ))}
    </div>
  )
}
