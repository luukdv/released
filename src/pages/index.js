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
import get from '../get'

const hour = 60 * 60 * 1000

export default React.memo(() => {
  const [labels, setLabels] = useState(() => {
    const savedLabels = window.localStorage.getItem('labels')

    if (savedLabels) {
      return JSON.parse(savedLabels)
    }

    return []
  })
  const [releases, setReleases] = useState(() => {
    const savedReleases = window.localStorage.getItem('releases')

    if (savedReleases) {
      return JSON.parse(savedReleases)
    }

    return []
  })

  const checkReleases = async () => {
    for (const label of labels) {
      const existing = releases.filter(r => r.labelId === label.id)
      const release = existing ? existing[0] : null

      if (release && release.checked && Date.now() < release.checked + hour) {
        continue
      }

      try {
        const latest = await get(
          // eslint-disable-next-line no-undef
          `${API_ENDPOINT}?label=${label.name}&year=2019${
            process.env.NODE_ENV === 'development' ? '&dev=1' : ''
          }`
        )

        if (!latest.response.length) {
          continue
        }

        const newRelease = {
          checked: Date.now(),
          labelId: label.id,
          img: latest.response[0].thumb,
          labelName: label.name,
          name: latest.response[0].title,
        }

        setReleases(
          release
            ? releases.map(r => {
                return r.labelId === label.id ? newRelease : r
              })
            : [...releases, newRelease]
        )
      } catch (e) {
        return
      }
    }
  }

  useEffect(() => {
    checkReleases()
    window.localStorage.setItem('labels', JSON.stringify(labels))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels])

  useEffect(() => {
    window.localStorage.setItem('releases', JSON.stringify(releases))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases])

  return (
    <State.Provider value={{ labels, setLabels, releases }}>
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
