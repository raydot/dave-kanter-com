import React from 'react'
import PropTypes from 'prop-types'

import pic01 from '../images/the_cyber.webp'
import pic03 from '../images/that_face.webp'

import Portfolio from './Portfolio'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class Main extends React.Component {
  render() {
    let close = (
      <div
        role="button"
        aria-label="close"
        className="close"
        tabIndex="0"
        onKeyDown={() => {
          this.props.onCloseArticle()
        }}
        onClick={() => {
          this.props.onCloseArticle()
        }}
      ></div>
    )

    return (
      <div
        ref={this.props.setWrapperRef}
        id="main"
        style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
      >
        <article
          id="intro"
          className={`${this.props.article === 'intro' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Dave Kanter Intro</h2>
          <span className="image main">
            <img src={pic01} alt="introduction" />
          </span>
          <p>
            I am a senior frontend developer who loves working with React, Node, CSS,
            and JAMStack development. In the past I have worked for
            companies ranging in size from the local mom-and-pop to the Global Fortune 50. I am also
            knowledgeable about SQL/NoSQL databases, PHP, and *nix systems.
            Currently I'm putting a lot of effort into learning more about
            artificial intelligence.
          </p>
          <p>
<<<<<<< HEAD
            My rewarding career has included not only development but also
            strategic roles in marketing, business and education.  
            I am also honored to have worked on the faculty of the Parsons
            School of Design, California College of the Arts, UC Berkeley, and
            Academy of Art University. I am a great fit for a role as a
            developer, leader, or strategist, with strengths that play well to
            digital studios and media- or education-focused companies.
=======
            In the past, my love of all things technological has led me to a
            rewarding career spanning business strategy, education, development.
            I co-owned a fantastic web shop in NYC for a while, have built web
            and multimedia properties for companies spanning in scale from
            mom-and-pop to Fortune 50, and I am honored to have worked on the
            faculties of several great universities. I am a great fit for a role
            as a developer, leader, strategist, or evangelist, with strengths
            that play well to digital studios and media- or education-focused
            companies.
>>>>>>> d06b6c4b727e8805fa9f895db680d127e6839a24
          </p>
          {close}
        </article>

        <article
          id="work"
          className={`${this.props.article === 'work' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Portfolio</h2>
          <Portfolio />
          {close}
        </article>

        <article
          id="about"
          className={`${this.props.article === 'about' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">About</h2>
          <span className="image main">
            <img src={pic03} alt="" />
          </span>
          <p>
            Dave lives in Marin County, CA, with his wife, son, two feisty dogs,
            and one laconic fish. When he can bear to tear himself away from a
            screen of some kind he can be found reading, cooking, hiking, and
            playing chess or music. Never any more than two at the same time.
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${this.props.article === 'contact' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Contact</h2>
          <form method="post" action="#">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <ul className="actions">
              <li>
                <input type="submit" value="Send Message" className="special" />
              </li>
              <li>
                <input type="reset" value="Reset" />
              </li>
            </ul>
          </form>
          <ul className="icons">
            <li>
              <a href="mailto:dave@davekanter.com">
                <span className="label">
                  <FontAwesomeIcon className="icon" icon={faEnvelope} />
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kanter/">
                <span className="label">
                  <FontAwesomeIcon className="icon" icon={faLinkedin} />
                </span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/raydot">
                <span className="label">
                  <FontAwesomeIcon className="icon" icon={faTwitter} />
                </span>
              </a>
            </li>
            <li>
              <a href="https://github.com/raydot">
                <span className="label">
                  <FontAwesomeIcon className="icon" icon={faGithub} />
                </span>
              </a>
            </li>
          </ul>
          {close}
        </article>
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main
