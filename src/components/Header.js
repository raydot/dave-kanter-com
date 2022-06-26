import React from 'react'
import PropTypes from 'prop-types'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-comment"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>DaveKanter.com</h1>
        <p>
          Experienced Frontend / React / JAM Stack Developer{' '}
          <button
            style={{
              boxShadow: 'none',
              fontSize: '0.8rem',

              padding: 0,
            }}
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            |{' '}
            <span
              style={{ borderBottom: '1px dotted rgba(255, 255, 255, 0.5)' }}
            >
              Contact Me
            </span>
          </button>
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('intro')
            }}
          >
            Intro
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('work')
            }}
          >
            Portfolio
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('about')
            }}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
