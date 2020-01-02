import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import Notice from './notice'
import State from '../context/state'
import auth from '../../auth'

export default React.memo(() => {
  const { setLabels, setReleases, setUser, user } = useContext(State)
  const [text, setText] = useState('Log in with Google')
  const [notice, setNotice] = useState(
    'You can log in to save or restore your added labels.'
  )

  if (user === null) {
    return
  }

  return user ? (
    <>
      <Notice>You are logged in as {user.user_metadata.full_name}.</Notice>
      <Button
        onClick={() => {
          setUser(false)
          setNotice('You are successfully logged out.')
          setLabels([])
          setReleases([])
          user.logout()
        }}
      >
        Log me out
      </Button>
    </>
  ) : (
    <>
      <Notice>{notice}</Notice>
      <Button
        onClick={() => {
          setText('One moment…')
          window.location.href = auth.loginExternalUrl('google')
        }}
      >
        {text}
      </Button>
    </>
  )
})

const Button = ({ children, href, onClick }) => (
  <div
    role="button"
    onClick={onClick}
    rel="nofollow"
    tabIndex={0}
    onKeyUp={e => (e.key === 13 || e.keyCode === 13) && onClick()}
    css={css`
      user-select: none;
      border-radius: 9em;
      box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.25);
      cursor: pointer;
      display: inline-flex;
      font-weight: 700;
      margin-top: 1em;
      outline: none;
      padding: 0.75em 1.25em;
      transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;

      &:focus,
      &:hover {
        box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.25);
        transform: translateY(-0.125em);
      }
    `}
  >
    {children}
  </div>
)
