import React from 'react'
import { css } from '@emotion/core'

export default () => (
  <>
    <h2>New releases</h2>
    <Release title="Dusk To Dawn Part I-III" artist="Mr. Tophat" label="" />
    <Release title="Studio Barnhus Volym 1" artist="Various" label="" />
    <Release title="Once Upon A Passion" artist="Bella Boo" label="" />
    <Release
      title="Mount Liberation Unlimited"
      artist="Mount Liberation Unlimited"
      label=""
    />
    <Release title="Stockholm Marathon" artist="Kornél Kovács" label="" />
    <Release
      title="Steal Chickens From Men And The Future From God"
      artist="Shakarchi & Stranéus"
      label=""
    />
    <Release title="Reveries Of" artist="Art Alfie" label="" />
    <Release title="The Bells" artist="Kornél Kovács" label="" />
    <Release title="Total" artist="Baba Stiltz" label="" />
    <Release title="Family Vacation" artist="Axel Boman" label="" />
    <Release title="Kuwa Huru" artist="Usio" label="" />
  </>
)

const Release = ({ artist, title, label }) => (
  <div>
    <strong>{title}</strong> by {artist}
  </div>
)
