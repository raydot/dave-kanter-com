import React from 'react'
import PropTypes from 'prop-types'

const Footer = props => (
  <footer id="footer" style={props.timeout ? { display: 'none' } : {}}>
    <p className="copyright">
      Built with <a href="http://www.reactjs.org">React</a> and{' '}
      <a href="https://www.gatsbyjs.org/">Gatsby</a>. Hosted with{' '}
      <a href="https://www.netlify.com">Netlify</a>. Template by{' '}
      <a href="https://html5up.net">HTML5 UP</a>.
    </p>
    <p className="copyright">All photography &copy;2019 Dave Kanter</p>
  </footer>
)

Footer.propTypes = {
  timeout: PropTypes.bool,
}

export default Footer
