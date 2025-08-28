const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node }, index) => {
    const path = node.frontmatter.path
    
    if (!path) {
      reporter.warn(`Post "${node.frontmatter.title || node.id}" is missing a path in frontmatter`)
      return
    }

    createPage({
      path,
      component: blogPostTemplate,
      context: {
        path, // This is passed to the GraphQL query as $path
        previous: index === posts.length - 1 ? null : posts[index + 1].node,
        next: index === 0 ? null : posts[index - 1].node,
      },
    })
  })
}
