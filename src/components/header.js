import React from 'react'
import Wrap from '../components/wrap'
import scale from '../../scale'
import { css } from '@emotion/core'

export default React.memo(() => (
  <Wrap>
    <div
      css={css`
        background: rgb(235, 235, 235);
        width: 100%;
        ${scale(15, 'height')}
        ${scale(4, 'margin-bottom')}
      `}
    ></div>
  </Wrap>
))
