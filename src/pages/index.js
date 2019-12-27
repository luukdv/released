import Head from '../components/head'
import Wrap from '../components/wrap'
import scale from '../../scale'
import strip from '../../strip'
import Saved from '../components/saved'
import User from '../components/user'
import Add from '../components/add'
import Header from '../components/header'
import Latest from '../components/latest'
import { css } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import Styles from '../components/styles'
import Footer from '../components/footer'
import NotReady from '../components/not-ready'
import State from '../context/state'
import get from '../get'

const threeHours = 3 * 60 * 60 * 1000

export default React.memo(() => {
  const [error, setError] = useState(false)
  const [ready, setReady] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [labels, setLabels] = useState([])
  const [releases, setReleases] = useState([])

  const updateRelease = async (label, release) => {
    if (release.checked && Date.now() < release.checked + threeHours) {
      return
    }

    setError(false)
    setUpdating(true)

    let latest

    try {
      latest = await get(`/.netlify/functions/searchLabels?label=${label.name}`)
    } catch (e) {
      setError(true)
      setUpdating(false)
      return
    }

    setReleases(prevReleases => {
      const newReleases = prevReleases.map(release => {
        return release.labelId === label.id
          ? {
              ...release,
              artist: latest.response.release
                ? encodeURIComponent(strip(latest.response.release.artist))
                : null,
              checked: Date.now(),
              img: latest.response.release ? latest.response.release.img : null,
              link: latest.response.release
                ? latest.response.release.link
                : null,
              title: latest.response.release
                ? encodeURIComponent(latest.response.release.title)
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <State.Provider
      value={{
        labels,
        setLabels,
        releases,
        setReleases,
        updateRelease,
        updating,
        error,
      }}
    >
      <Head />
      <Styles />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        `}
      >
        <div
          css={css`
            flex-grow: 1;
            ${scale(6, 'margin-bottom')}
          `}
        >
          <Header />
          {!ready ? (
            <Wrap>
              <NotReady />
            </Wrap>
          ) : (
            <Wrap>
              <div
                css={css`
                  ${scale(4, 'margin-bottom')}

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
                <User />
              </div>
            </Wrap>
          )}
        </div>
        <Wrap>
          <Footer />
        </Wrap>
      </div>
    </State.Provider>
  )
})
