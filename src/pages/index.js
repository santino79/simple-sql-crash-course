import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
// import styled from '@emotion/styled'
import Layout from 'components/Layout'
// import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'

const Hero = () => {
  const theme = useTheme()
  return (
    <section
      css={css`
        color: ${theme.colors.white};
        width: 100%;
        background: ${theme.colors.primary};
        padding: 20px 0 30px 0;
        display: flex;
      `}
    >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.white};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(15)};
          `}
        >
          Bite-sized SQL lessons for data analysts.
        </h1>
      </Container>
      <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      />
    </section>
  )
}

// const Description = styled.p`
//   margin-bottom: 10px;
//   display: inline-block;
// `

export default function Index({ data: { site, allMdx } }) {
  // const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >


      <h3>Who is this FREE SQL Crash Course for?</h3>
      <ul>
        <li>
        You don't have any SQL experience. All you're getting is tumbleweed when you apply for data jobs that ask for SQL knowledge. 
        It's starting to look like you'll never get your foot in the door.
        </li>
      <li>You've been working with data and spreadsheets for years in your current job. 
      Excel was your gateway drug. A macro here, a formula there. 
      But no-one takes you seriously when you want to make the move into an actual BI analyst role.</li>

      <li>You've taken Data Analytics classes in college and filled your resume with buzzwords aplenty. 
      Spark, Hadoop, Python, R. But hiring managers won't even consider you for entry level data analyst jobs. 
      They see your face drop into a sad frown when they mention your lack of SQL knowledge.</li>

      <li>You hear recruiters say <strong>"every analyst should know the basics of SQL" </strong> 
      but you don't even know where to begin.</li>
      </ul>


      <h3>What do I need to know?</h3>
      <p>
      You don't need any experience of SQL or coding for this course. 
      We'll take it slowly and build the solid groundwork you'll need to get up to speed with SQL.
      Then you can practice at your own pace with some interactive quizzes with real data and hands-on SQL code.
      <br /><br />
      Get started <strong>right now</strong> with the first lesson (it only takes a few minutes).
      <br /><br />
      <button href="/sql-what-is-sql">Let's get started</button>
      </p>
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
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            slug
            keywords
          }
        }
      }
    }
  }
`
