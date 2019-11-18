import Head from '../components/head'
import Wrap from '../components/wrap'
import Saved from '../components/saved'
import Add from '../components/add'
import New from '../components/new'
import { css } from '@emotion/core'
import React from 'react'
import Styles from '../components/styles'

export default () => (
  <>
    <Head />
    <Styles />
    <Wrap>
      <div
        css={css`
          @media (min-width: 961px) {
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
        <Saved />
      </div>
    </Wrap>
  </>
)
