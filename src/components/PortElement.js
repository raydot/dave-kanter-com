import React, { Fragment } from 'react'
// import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const PortElement = ({ children, image }) => {
  return (
    <div>
      <Fragment>
        <p>Item Ipsum Dolor Est</p>
        <Img fixed={image} />
        {children}
      </Fragment>
    </div>
  )
}

PortElement.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PortElement
