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
          Experienced Front End / React / JAM Stack Developer{' '}
          <a href="#contact">( Contact Me )</a>
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            class="button"
            onClick={() => {
              props.onOpenArticle('intro')
            }}
          >
            Intro
          </button>
        </li>
        <li>
          <button
            class="button"
            onClick={() => {
              props.onOpenArticle('work')
            }}
          >
            Portfolio
          </button>
        </li>
        <li>
          <button
            class="button"
            onClick={() => {
              props.onOpenArticle('about')
            }}
          >
            About
          </button>
        </li>
        <li>
          <button
            class="button"
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
