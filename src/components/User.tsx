import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import Notice from './Notice'
import State from '../context/State'
import auth from '../auth'

export default () => {
  const { user, done, logout } = useContext(State)
  const [text, setText] = useState('Log in with Google')
  const [notice, setNotice] = useState(
    'You can log in to save or restore your added labels.'
  )

  if (!done) {
    return null
  }

  return user ? (
    <>
      <Notice>
        <>You are logged in as {user.user_metadata.full_name}.</>
      </Notice>
      <Button
        onClick={() => {
          setNotice('You are successfully logged out.')
          logout()
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
}

const Button = ({
  children,
  onClick,
}: {
  children: string
  onClick: () => void
}) => (
  <div
    role="button"
    onClick={onClick}
    tabIndex={0}
    onKeyUp={(e) => (e.key === 'Enter' || e.keyCode === 13) && onClick()}
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
