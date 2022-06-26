import React from 'react'
import PropTypes from 'prop-types'

const year = new Date().getFullYear()

const Footer = props => (
  <footer id="footer" style={props.timeout ? { display: 'none' } : {}}>
    <p className="copyright">
      Built with{' '}
      <a href="http://www.reactjs.org" target="_new">
        React
      </a>{' '}
      and{' '}
      <a href="https://www.gatsbyjs.org/" target="_new">
        Gatsby
      </a>
      . Hosted with{' '}
      <a href="https://www.netlify.com" target="_new">
        Netlify
      </a>
      . Template by{' '}
      <a href="https://html5up.net" target="_new">
        HTML5 UP
      </a>
      .
    </p>
    <p className="copyright">All photos &copy;{year} Dave Kanter</p>
  </footer>
)

Footer.propTypes = {
  timeout: PropTypes.bool,
}

export default Footer
