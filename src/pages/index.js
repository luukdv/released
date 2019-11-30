import Head from '../components/head'
import Wrap from '../components/wrap'
import scale from '../../scale'
import Saved from '../components/saved'
import Add from '../components/add'
import Latest from '../components/latest'
import { css } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import Styles from '../components/styles'
import State from '../context/state'

export default React.memo(() => {
  const [labels, setLabels] = useState(() => {
    const savedLabels =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('labels')
        : null

    if (savedLabels) {
      return JSON.parse(savedLabels)
    }

    return []
  })
  const [releases, setReleases] = useState(() => {
    const savedReleases =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('releases')
        : null

    if (savedReleases) {
      return JSON.parse(savedReleases)
    }

    return []
  })

  useEffect(() => {
    window.localStorage.setItem('labels', JSON.stringify(labels))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels])

  useEffect(() => {
    window.localStorage.setItem('releases', JSON.stringify(releases))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases])

  return (
    <State.Provider value={{ labels, setLabels, releases, setReleases }}>
      <Head />
      <Styles />
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
          <Latest />
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
    </State.Provider>
  )
})
