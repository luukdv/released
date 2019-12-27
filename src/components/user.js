import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import Notice from './notice'
import State from '../context/state'
import auth, { getParams } from '../../auth'

export default React.memo(() => {
  const [user, setUser] = useState()
  const { labels, releases } = useContext(State)

  useEffect(() => {
    ;(async () => {
      const params = getParams()

      if (params) {
        await auth.createUser(params)
      }

      const user = auth.currentUser()
      const token = user ? await user.jwt() : null

      setUser(token ? user : false)

      if (token && !user.user_metadata.set) {
        user.update({
          data: {
            set: true,
            labels,
            releases,
          },
        })
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (user === null) {
    return <Notice>Checking login…</Notice>
  }

  if (user === false) {
    return (
      <>
        <Notice>You can log in to save or restore your added labels.</Notice>
        <Button href={auth.loginExternalUrl('google')}>
          Log in with Google
        </Button>
      </>
    )
  }

  if (user) {
    return (
      <>
        <Notice>You are logged in as {user.user_metadata.full_name}.</Notice>
        <Button href="">Log me out</Button>
      </>
    )
  }
})

const Button = ({ children, href }) => (
  <a
    href={href}
    rel="nofollow"
    css={css`
      border-radius: 9em;
      box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.25);
      cursor: pointer;
      display: inline-flex;
      font-weight: 700;
      text-decoration: none;
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
  </a>
)
