import React from 'react'
import Release from './release'
import { useContext } from 'react'
import State from '../context/state'

export default React.memo(() => {
  const { releases } = useContext(State)

  return (
    <>
      <h2>Latest albums</h2>
      {!!releases.length &&
        releases.map(release => (
          <Release
            key={release.labelId}
            title={release.name.split(' - ')[1]}
            artist={release.name.split(' - ')[0]}
            label={release.labelName}
            image={release.img}
          />
        ))}
    </>
  )
})