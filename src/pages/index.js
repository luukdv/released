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
  const [ready, setReady] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [labels, setLabels] = useState([])
  const [releases, setReleases] = useState([])

  const updateRelease = async (label, release) => {
    if (release.checked && Date.now() < release.checked + hour) {
      console.log('not updating', label.name)
      return
    } else {
      console.log('updating', label.name)
    }

    setUpdating(true)

    let latest

    try {
      latest = await get(
        // eslint-disable-next-line no-undef
        `${API_ENDPOINT}?label=${label.name}${
          process.env.NODE_ENV === 'development' ? '&dev=1' : ''
        }`
      )
    } catch (e) {
      console.log(e)
      return
    }

    setReleases(prevReleases => {
      const newReleases = prevReleases.map(release => {
        return release.labelId === label.id
          ? {
              ...release,
              artist: latest.response.release
                ? latest.response.release.artist
                : null,
              checked: Date.now(),
              img: latest.response.release ? latest.response.release.img : null,
              title: latest.response.release
                ? latest.response.release.title
                : null,
            }
          : release
      })

      window.localStorage.setItem('releases', JSON.stringify(newReleases))
      return newReleases
    })
    setUpdating(false)
  }

  useEffect(() => {
    const labelsData = window.localStorage.getItem('labels')
    const savedLabels = labelsData ? JSON.parse(labelsData) : null
    const releasesData = window.localStorage.getItem('releases')
    const savedReleases = releasesData ? JSON.parse(releasesData) : null

    if (!(savedLabels && savedReleases)) {
      setReady(true)
      return
    }

    setTimeout(() => {
      setLabels(savedLabels)
      setReleases(savedReleases)
      setReady(true)

      for (const label of savedLabels) {
        const release = savedReleases.filter(r => r.labelId === label.id)[0]
        updateRelease(label, release)
      }
    }, 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <State.Provider
      value={{
        labels,
        setLabels,
        releases,
        setReleases,
        updateRelease,
        updating,
      }}
    >
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
      {!ready ? (
        <Wrap>
          <div
            css={css`
              text-align: center;
              width: 100%;
            `}
          >
            <h2
              css={css`
                margin: 0;
              `}
            >
              Retrieving saved data…
            </h2>
          </div>
        </Wrap>
      ) : (
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
      )}
    </State.Provider>
  )
})
