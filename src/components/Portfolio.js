import React from 'react'
import { useStaticQuery } from 'gatsby'
import Image from './Image'
import '../assets/scss/components/_portfolio.scss'

const Portfolio = () => {
  const gql = useStaticQuery(graphql`
    {
      allProjectsJson {
        nodes {
          id
          description
          title
          src
          lead
        }
      }
    }
  `)

  const data = gql.allProjectsJson.nodes
  // console.log(data)

  return data.map(data =>
    data.src !== 'null' ? (
      <>
        <div id={data.id} className="portfolioItem">
          <h4 style={{ marginBottom: '0' }}>{data.title}</h4>
          <Image
            fileName={data.src}
            style={{ width: '100%' }}
            alt={data.title}
          />
          <div style={{ paddingTop: '1rem' }}>{data.description}</div>
          <hr />
        </div>
      </>
    ) : null
  )
}

export default Portfolio
