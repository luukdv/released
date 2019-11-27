import React from 'react'
import Release from './release'
import { useContext, useEffect, useState } from 'react'
import State from '../context/state'
import get from '../get'

const hour = 60 * 60 * 1000

export default React.memo(() => {
  const [error, setError] = useState([])
  const { labels, setLabels } = useContext(State)

  useEffect(() => {
    setError(false)

    if (!labels.length) {
      return
    }

    ;(async () => {
      try {
        for (const label of labels) {
          if (label.checked && Date.now() < label.checked + hour) {
            continue
          }

          console.log('getting latest release from', label.name)

          let latest = await get(
            // eslint-disable-next-line no-undef
            `${API_ENDPOINT}?label=${label.name}&year=2019${
              process.env.NODE_ENV === 'development' ? '&dev=1' : ''
            }`
          )

          setLabels(
            labels.map(prevLabel => {
              if (prevLabel.id === label.id) {
                prevLabel.checked = Date.now()

                if (!latest.response.length) {
                  return prevLabel
                }

                prevLabel.release = {
                  img: latest.response[0].thumb,
                  name: latest.response[0].title,
                }
              }

              return prevLabel
            })
          )
        }
      } catch (e) {
        setError(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels])

  return (
    <>
      <h2>Latest albums</h2>
      {!!labels.length &&
        labels.map(label =>
          label.release ? (
            <Release
              key={label.id}
              title={label.release.name.split(' - ')[1]}
              artist={label.release.name.split(' - ')[0]}
              label={label.name}
              image={label.release.img}
            />
          ) : null
        )}
    </>
  )
})
