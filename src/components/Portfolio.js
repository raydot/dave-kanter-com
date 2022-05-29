import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import '../scss/portfolio.scss'

const Portfolio = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          coffindaffer: file(relativePath: { eq: "coffindaffer.jpg" }) {
            ...fluidImage
          }
          kaiser: file(relativePath: { eq: "kaiserCardiacCare.png" }) {
            ...fluidImage
          }
          monster: file(relativePath: { eq: "monsterpoop.jpg" }) {
            ...fluidImage
          }
          opsumit: file(relativePath: { eq: "opsumithcp.png" }) {
            ...fluidImage
          }
          pahuman: file(relativePath: { eq: "pahuman.png" }) {
            ...fluidImage
          }
          saxenda: file(relativePath: { eq: "saxendamoa.png" }) {
            ...fluidImage
          }
          starwars: file(relativePath: { eq: "starwars.png" }) {
            ...fluidImage
          }
          trenchless: file(relativePath: { eq: "trenchless.jpg" }) {
            ...fluidImage
          }
          urbach: file(relativePath: { eq: "urbach.jpg" }) {
            ...fluidImage
          }
        }
      `}
      render={data => (
        <div>
          <Img fluid={data.coffindaffer.childImageSharp.fluid} />
          <Img fluid={data.starwars.childImageSharp.fluid} />
          <Img fluid={data.kaiser.childImageSharp.fluid} />
          <Img fluid={data.monster.childImageSharp.fluid} />
          <Img fluid={data.opsumit.childImageSharp.fluid} />
          <Img fluid={data.pahuman.childImageSharp.fluid} />
          <Img fluid={data.saxenda.childImageSharp.fluid} />
          <Img fluid={data.trenchless.childImageSharp.fluid} />
          <Img fluid={data.urbach.childImageSharp.fluid} />
        </div>
      )}
    />
  )
}

export default Portfolio
