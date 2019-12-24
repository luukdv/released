import env from '../../env'
import gotrue from 'gotrue-js'
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import Notice from './notice'

const auth = new gotrue({ APIUrl: `${env.url}/.netlify/identity`, setCookie: true })
const hash = document.location.hash
const params = hash ? hash.slice(1).split('&').reduce((list, param) => {
  const [key, val] = param.split('=')
  list[key] = val

  return list
}, {}) : null

if (params) {
  auth.createUser(params)
}

export default React.memo(() => {
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      const user = auth.currentUser()
      const valid = user ? await user.jwt() : null

      setUser(valid ? user : false)
    })()
  }, [])

  if (user === null) {
    return (
      <Notice>Checking login…</Notice>
    )
  }

  if (user === false) {
    return (
      <>
        <Notice>You can log in to save or restore your added labels.</Notice>
        <Button>Log in with Google</Button>
      </>
    )
  }

  if (user) {
    return (
      <>
        <Notice>You are now logged in.</Notice>
        <Button>Log out</Button>
      </>
    )
  }
})

const Button = ({ children }) => (
  <div
    css={css`
      border-radius: 9em;
      box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.25);
      cursor: pointer;
      display: inline-flex;
      font-weight: 700;
      margin-top: 1em;
      padding: 0.75em 1.25em;
      transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;

      &:hover {
        box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.25);
        transform: translateY(-0.125em);
      }
    `}
  >
    {children}
  </div>
)
