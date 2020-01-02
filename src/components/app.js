import Add from './add'
import Footer from './footer'
import Head from './head'
import Header from '../components/header'
import Latest from './latest'
import NotReady from './not-ready'
import React, { useContext } from 'react'
import Saved from './saved'
import scale from '../../scale'
import State from '../context/state'
import Styles from './styles'
import User from './user'
import Wrap from './wrap'
import { css } from '@emotion/core'

export default React.memo(() => {
  const { user } = useContext(State)

  return (
    <>
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
          {user === null ? (
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
    </>
  )
})
