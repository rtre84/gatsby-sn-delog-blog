---
template: BlogPost
path: /2018-02-20___the_blog_is_live
date: 2018-02-20T07:08:00.000Z
title: The Blog Is Live!
metaDescription: Life's too short for a subtitle.
thumbnail: /assets/13020875105_33d0df0eaa_b.jpg
---
Welcome to the Serving Niches Blog. After a few weeks of tinkering and working through bugs, this GatsbyJS powered blog is finally ready for 
prime time. All code for this site is open source and can be 
found [here](https://github.com/ServingNiches/gatsby-servingniches). 

### Issues encountered:

* ##### Issue 1: The forked repo, that this site used as a starting point, needed to be ported to Gatsby V2.

  ```
  **Fix:** Go through the really good official documentation on porting from Gatsby V1 to V2 [here](https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/). The Layout functionality had to be moved under the 
  ```

  components and are treated just as another component instead of a template that is applied to all pages. The layout functionality from Gatsby v1 can be recreated using the plugin "gatsby-plugin-layout".

  ```javascript
  // File: gatsby-config.js   
  {
    resolve: `gatsby-plugin-layout`,
    options: {
       component: require.resolve(`${__dirname}/src/components/layouts/index.jsx`),
     },
  },
  ```

* ##### Issue 2: Images in markdown not being rendered

    **Fix:** Images in the markdown (.md) files were not being rendered. The problem was twofold.  

  ```
     1. The cover images could not be found.  
     2. The images in the blog post returned a 404.
  ```

    The fix involved adding two gatsby plugins 

  ```
  "gatsby-remark-copy-images": "^0.2.1",
  "gatsby-remark-images": "^3.0.3",
  ```

  ```javascript
  // File: gatsby-config.js
  {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            'gatsby-remark-copy-images',
          ],
        },
  },
  {
        resolve: 'gatsby-remark-images',
  },
  ```

    GraphQL should return a publicURL field that will contain the url for the image you're trying to display    in your component.

  ```json5
  ...
  cover {
         id,
         publicURL, 
         name
  },
  ...
  ```

  ```javascript
  export const query = graphql` 
    query {
    allMarkdownRemark (
    sort: { fields: [frontmatter___date], order: DESC })
    {
      edges {
        node {
          id,
          fields {
            slug
          },
          frontmatter {
            title
            subTitle
            cover {
              id,
              publicURL, 
              name
            },
            categories,
            date
          },
          excerpt
          headings {
            value
            depth
          }
          html,
          rawMarkdownBody,
          fileAbsolutePath,
        }
      }
    }
  }`;
  ```

### Features added:

* ##### Feature 1: A blog section has been added. With the exception of styling, everything else closely follows the information found at the below links.

   Official GatsbyJS documentation on creating a blog\
   https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/

   Egghead.io's FREE video series on building a blog with Gatsby\
    https://egghead.io/courses/build-a-blog-with-react-and-markdown-using-gatsby

* ##### Feature 2: Individual blog posts are generated from markdown.    Technically, this isn't a separate feature but since the original idea was to 
    have individual posts styled differently, I'm going to leave this on here. 

   Programmatically create pages from data\
    https://www.gatsbyjs.org/tutorial/part-seven/

### Useful Links

* [Gatsby Official Documentation](https://www.gatsbyjs.org/docs/)
* [Awesome Gatsby List on Github](https://github.com/prayash/awesome-gatsby)

### Cover Image Source

Image Source: [Flickr](https://www.flickr.com/photos/tjlto/13020875105/in/photolist-kQBowD-Ef48hQ-UMSnzN-otE5Ge-2a3b2qD-HKXt4n-fMZJNB-265U2h1-bD7b3U-24Ze34q-rkFd9Z-nZbXfw-hmdCZJ-T4hoV7-8XyNvA-dtyrNK-oWZMW9-RTxsPw-23Zhty4-Qxj9so-NzGAB7-T8wf9T-26FiJNo-2bofDmd-oeTGeX-d9gXzu-3fGvrF-T6F16N-TjTNqo-dNGpfG-JYE82M-Teypz7-8dk9Kq-a42g3t-2ao6daP-8eUcwE-Tp71UT-pkZgGW-29dyKRJ-Texbq7-YV4Urx-21f3rTH-S3ZSFw-dKFYFx-ULNrWF-TdzuNw-2cV4bxb-T1Gos9-bAJh6V-WRcf5j)
