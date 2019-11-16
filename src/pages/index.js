import Head from '../components/head'
import Wrap from '../components/wrap'
import React from 'react'
import Styles from '../components/styles'

export default () => (
  <>
    <Head />
    <Styles />
    <Wrap>
      <div>
        <h2>New releases</h2>
      </div>
      <div>
        <h2>Add new label</h2>
        <h2>Saved labels</h2>
      </div>
    </Wrap>
  </>
)
