import React from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import { Link } from 'gatsby' 
import { Twitter, GitHub } from './Social'
import Container from './Container'
import MCForm from './Forms/MCForm'

const Footer = ({ author, noSubscribeForm }) => (
  <footer>
    <Container
      css={css`
        padding-top: 0;
        ${bpMaxSM} {
          padding-top: 0;
        }
      `}
    >
      {!noSubscribeForm && (
        <div>
          <MCForm />
          <br />
          <br />
        </div>
      )}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            font-size: 90%;
            opacity: 0.7;
          `}
        >
          <Link to="https://simpleanalytical.com">{author && `${author}`}</Link> {` \u00A9 ${new Date().getFullYear()}`} 
          <Link to="/contact">{` Got any feedback?`}</Link>
        </div>
        <div>
          <Twitter />
          <GitHub />
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
