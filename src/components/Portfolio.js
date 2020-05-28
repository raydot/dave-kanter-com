import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

//import Projects from './Projects.json'
// import Coffindaffer from '../images/coffindaffer.jpg'
// import Kaiser from '../images/kaiserCardiacCare.png'
// import Monster from '../images/monsterpoop.jpg'
// import Opsumit from '../images/opsumithcp.png'
// import Pahuman from '../images/pahuman.png'
// import Saxendamoa from '../images/saxendamoa.png'
// import Starwars from '../images/starwars.png'
// import Trenchless from '../images/trenchless.jpg'
import Urbach from '../images/urbach.jpg'

export const Portfolio = () => (
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }
  //render() {
  <useStaticQuery
    query={graphql`
      query ProjectsQuery {
        allProjectsJson {
          edges {
            node {
              id
              title
              description
              src
              alt
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <ul>{getProjects(data)}</ul>
      </div>
    )}
  />
)

function getProjects(data) {
  const projectItemsArray = []
  data.allProjectsJson.edges.forEach(item =>
    projectItemsArray.push(
      <div key={item.node.id} className="project">
        {item.node.title}
        <br />
        {item.node.description}
        <br />
        <img src={Urbach} alt={item.node.alt} />
        <br />
      </div>
    )
  )
  console.log('pIA', projectItemsArray)
  return projectItemsArray
}

//export default Portfolio

//  {<Img src={`../images/${item.node.img}`} />}
