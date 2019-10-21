import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

//import Projects from './Projects.json'
// import coffandaffer from '../images/coffindaffer.jpg'
// import kaiser from '../images/kaiserCardiacCare.png'
// import monster from '../images/monsterpoop.jpg'
// import opsumit from '../images/opsumithcp.png'
// import pahuman from '../images/pahuman.png'
// import saxendamoa from '../images/saxendamoa.png'
// import starwars from '../images/starwars.png'
// import trenchless from '../images/trenchless.jpg'
// import urbach from '../images/urbach.jpg'

export const Portfolio = () => (
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }
  //render() {
  <StaticQuery
    query={graphql`
      query ProjectsQuery {
        allProjectsJson {
          edges {
            node {
              id
              title
              description
              img
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
        <Img src={`../images/${item.node.img}`} />
        <br />
      </div>
    )
  )
  return projectItemsArray
}

//export default Portfolio
