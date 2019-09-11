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


<h1>Get in touch.</h1>
    <p>Got some feedback about the SQL Crash Course? Found a problem, error or something you thing should be added in?
      <br /><br />
      Drop me a note on the contact form below and I'll get back to you as soon as I can.
      <br /><br />
      Thanks!
      <br />
      Alan, <a href="https://simpleanalytical.com">SimpleAnalytical.com</a>
    </p>
    
    <form name="contact" method="POST" data-netlify="true" action="/contact-success">
                <input type="hidden" name="form-name" value="contact" />  
                <p>
                  <label><strong>Your Name:</strong></label>
                  <br />
                  <input type="text" name="name" />   
                </p>
                <p>
                  <label><strong>Your Email:</strong></label>
                  <br /> <input type="email" name="email" />
                </p>
                <p>
                  <label><strong>Message:</strong></label>
                  <br /><textarea name="message" cols="40" rows="8"></textarea>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </form>
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
