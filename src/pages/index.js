import Head from '../components/head'
import Wrap from '../components/wrap'
import scale from '../../scale'
import Saved from '../components/saved'
import Add from '../components/add'
import New from '../components/new'
import { css } from '@emotion/core'
import React, { useState } from 'react'
import Styles from '../components/styles'
import State from '../context/state'

export default () => {
  const [labels, setLabels] = useState([])

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
}
