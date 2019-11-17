import Head from '../components/head'
import Wrap from '../components/wrap'
import Saved from '../components/saved'
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
          width: 50%;
        `}
      >
        <New />
      </div>
      <div
        css={css`
          width: 40%;
        `}
      >
        <h2>Add new label</h2>
        <Saved />
      </div>
    </Wrap>
  </>
)
