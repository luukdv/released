import React from 'react'
import { css } from '@emotion/core'
import Label from './label'

export default () => (
  <>
    <h2>Saved labels</h2>
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <Label name="Creme Organization" />
      <Label name="!K7 Records" />
      <Label name="Modern love" />
      <Label name="Verve records" />
      <Label name="Virgin records" />
      <Label name="OM records" />
      <Label name="Colemine" />
      <Label name="Music From Memory" />
      <Label name="Studio Barnhus" />
      <Label name="Tan Cressida" />
      <Label name="Dead Oceans" />
      <Label name="Strange Life" />
      <Label name="Kranky" />
      <Label name="Mule Records" />
      <Label name="Beggars Banquet" />
      <Label name="Back to Mine" />
      <Label name="Matador" />
      <Label name="Captured Tracks" />
      <Label name="Fabric" />
      <Label name="Young God" />
      <Label name="Endless Flight" />
      <Label name="Top Dawg" />
      <Label name="Warp Records" />
      <Label name="PIAS" />
      <Label name="Caldo Verde" />
      <Label name="Cosmic Compositions" />
    </div>
  </>
)
