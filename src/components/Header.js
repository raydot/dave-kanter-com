import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faComment } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <header
      id="header"
      className={isLoading ? 'is-loading' : ''}
      style={props.timeout ? { display: 'none' } : {}}
    >
      {/* <div className="logo">
        <FontAwesomeIcon className="icon" icon={faComment} />
      </div> */}
      <div className="content">
        <div className="inner">
          <h1>Dave Kanter</h1>
          <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', justifyContent: 'center' }}>
            <span style={{ whiteSpace: 'nowrap' }}>Technical Strategist,</span>
            <span style={{ whiteSpace: 'nowrap' }}>Team Leader &</span>
            <span style={{ whiteSpace: 'nowrap' }}>Fullstack web developer</span>
          </p>
          {/* <p>
            <button
              onClick={() => {
                props.onOpenArticle('contact')
              }}
            >
              <span>CONTACT ME</span>
            </button>
          </p> */}
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
}

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
