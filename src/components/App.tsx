import Add from './Add'
import Footer from './Footer'
import Head from './Head'
import Header from '../components/Header'
import Latest from './Latest'
import NotReady from './NotReady'
import React, { useContext } from 'react'
import Saved from './Saved'
import scale from '../scale'
import State from '../context/State'
import Styles from './Styles'
import User from './User'
import Wrap from './Wrap'
import { css } from '@emotion/core'

export default () => {
  const { done } = useContext(State)

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
          {!done ? (
            <Wrap>
              <NotReady />
            </Wrap>
          ) : (
            <Wrap>
              <>
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
              </>
            </Wrap>
          )}
        </div>
        <Wrap>
          <Footer />
        </Wrap>
      </div>
    </>
  )
}
