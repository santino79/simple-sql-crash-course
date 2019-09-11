import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
// import styled from '@emotion/styled'
import Layout from 'components/Layout'
// import { useTheme } from 'components/Theming'
import Container from 'components/Container'
// import { rhythm } from '../lib/typography'


export default function Index({ data: { site } }) {
  // const theme = useTheme()
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >


<h1>Message Sent Successfully.</h1>
    <p>Thanks! I'll get back to you soon.</p>
        <hr />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
  }
`
