import React from 'react'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

const Image = ({ fileName, alt, style }) => {
  // console.log(fileName, alt, style)
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const fluid = allImageSharp.nodes.find(n => n.fluid.originalName === fileName)
    .fluid

  console.log('FLUID:', fluid)

  return (
    <figure>
      <Img fluid={fluid} alt={alt} style={style} />
    </figure>
  )
}

export default Image

/*
https://stackoverflow.com/questions/56437205/how-do-i-query-multiple-images-with-gatsby-image

Usage:
<Image fileName="yourImage.jpg" style={{ width: '100%' }} alt="" />
*/
