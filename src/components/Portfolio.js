import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

export default function Portfolio() {
  return (
    <StaticQuery
      query={graphql`
        {
          projectsJson {
            id
            description
          }
        }
      `}
      render={data => <h3>{data.projectsJson.description}</h3>}
    />
  )
}

// import React from 'react'
// // import { graphql } from 'gatsby'
// import PortElement from './PortElement'

// const Portfolio = ({ data }) => (
//   <div>
//     <PortElement image={data.image.childImageSharp.fixed} />
//   </div>
// )

// export default Portfolio
//import Img from 'gatsby-image'
//import PropTypes from 'prop-types'

// import Projects from '../data/Projects.json'
// import Coffindaffer from '../images/coffindaffer.jpg'
// import Kaiser from '../images/kaiserCardiacCare.png'
// import Monster from '../images/monsterpoop.jpg'
// import Opsumit from '../images/opsumithcp.png'
// import Pahuman from '../images/pahuman.png'
// import Saxendamoa from '../images/saxendamoa.png'
// import Starwars from '../images/starwars.png'
// import Trenchless from '../images/trenchless.jpg'
// import Urbach from '../images/urbach.jpg'

// // const Layout = ({ children }) => {
// //   return (
// //     <StaticQuery
// //       query={query}
// //       render={data => (
// //         <Fragment>
// //           <Header />
// //           <Img fluid={data.bgImg.childImageSharp.fluid} />
// //           {children}
// //         </Fragment>
// //       )}
// //     />
// //   )
// // }

// // Layout.propTypes = {
// //   children: PropTypes.node.isRequired,
// // }

// Portfolio.propTypes = {
//   children: PropTypes.node.isRequired,
// }
