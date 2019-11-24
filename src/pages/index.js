import Head from '../components/head'
import Wrap from '../components/wrap'
import scale from '../../scale'
import Saved from '../components/saved'
import Add from '../components/add'
import New from '../components/new'
import { css } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import Styles from '../components/styles'
import State from '../context/state'

export default React.memo(() => {
  const [labels, setLabels] = useState(() => {
    const savedLabels = window.localStorage.getItem('labels')

    if (savedLabels) {
      return JSON.parse(savedLabels)
    }

    return []
  })

  useEffect(() => {
    window.localStorage.setItem('labels', JSON.stringify(labels))
  }, [labels])

  return (
    <State.Provider value={{ labels, setLabels }}>
      <Head />
      <Styles />
      <Wrap>
        <div
          css={css`
            ${scale(5, 'margin-bottom')}

            @media (min-width: 961px) {
              margin-bottom: 0;
              width: 55%;
            }
          `}
        >
          <New />
        </div>
        <div
          css={css`
            @media (min-width: 961px) {
              width: 37.5%;
            }
          `}
        >
          <Add />
          <Saved labels={labels} />
        </div>
      </Wrap>
    </State.Provider>
  )
})
