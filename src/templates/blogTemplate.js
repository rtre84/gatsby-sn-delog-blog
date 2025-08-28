import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import PostLink from "../components/post-link"

const Template = ({ data, pageContext }) => {
  // Debug logging - remove these after fixing
  console.log("Template data:", data)
  console.log("Template pageContext:", pageContext)
  console.log("markdownRemark:", data?.markdownRemark)

  const { markdownRemark } = data // blogpost data
  
  // Add error handling for null markdownRemark
  if (!markdownRemark) {
    console.error("markdownRemark is null for path:", pageContext?.path || "unknown path")
    return (
      <Layout>
        <Helmet>
          <title>Post Not Found</title>
        </Helmet>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>Post Not Found</h1>
            <p>Sorry, this blog post could not be found.</p>
            <p><strong>Debug info:</strong></p>
            <ul>
              <li>Requested path: {pageContext?.path || "No path provided"}</li>
              <li>Data received: {JSON.stringify(data, null, 2)}</li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }

  const { frontmatter, html } = markdownRemark
  
  // Additional safety check for frontmatter
  if (!frontmatter) {
    console.error("frontmatter is null for markdownRemark:", markdownRemark)
    return (
      <Layout>
        <Helmet>
          <title>Post Data Missing</title>
        </Helmet>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>Post Data Missing</h1>
            <p>This post exists but is missing frontmatter data.</p>
            <p><strong>Debug info:</strong></p>
            <pre>{JSON.stringify(markdownRemark, null, 2)}</pre>
          </div>
        </div>
      </Layout>
    )
  }

  const { next, previous } = pageContext

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description || frontmatter.title} />
      </Helmet>
      <div className="blog-post-container">
        <article className="post">
          {frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <img src={frontmatter.thumbnail} alt={frontmatter.title} />
            </div>
          )}
          
          <div className="blog-post-header">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            {frontmatter.description && <p>{frontmatter.description}</p>}
          </div>

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <div className="blog-post-nav">
          {previous && (
            <PostLink post={previous} />
          )}
          {next && (
            <PostLink post={next} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        thumbnail
      }
    }
  }
`
