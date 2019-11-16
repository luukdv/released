import scale from '../../scale'
import Head from '../components/head'
import Wrap from '../components/wrap'
import { css } from '@emotion/core'
import React from 'react'
import Styles from '../components/styles'

export default () => (
  <>
    <Head />
    <Styles />
    <Wrap>
      <div>
        <h2>New releases</h2>
      </div>
      <div
        css={css`
          width: 40%;
        `}
      >
        <h2>Add new label</h2>
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
      </div>
    </Wrap>
  </>
)

const Label = ({ name }) => (
  <div
    css={css`
      color: white;
      font-weight: 700;
      margin: 0 0.75em 0.75em 0;
      position: relative;
      ${scale(1, 'font-size')}

      &:hover .remove {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }
    `}
  >
    <div
      css={css`
        background: rgb(160, 160, 160);
        border-radius: 9em;
        user-select: none;
        text-align: center;
        line-height: 1.25;
        padding: 0.5em 1em;
      `}
    >
      {name}
    </div>
    <div
      className="remove"
      css={css`
        background: rgb(255, 40, 80);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.5) translate(-1em, 1em);
        transition: transform 0.2s ease-out;
        will-change: transform;
        width: 2em;
        height: 2em;
        pointer-events: none;
        opacity: 0;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        top: -0.75em;
        right: -0.75em;
        z-index: 1;
      `}
    >
      ✕
    </div>
  </div>
)
