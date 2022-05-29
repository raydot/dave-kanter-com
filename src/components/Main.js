import React from 'react'
import PropTypes from 'prop-types'

import pic01 from '../images/the_cyber.png'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/that_face.png'

import Portfolio from './Portfolio'

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
            I am a front-end developer whose skill set tends towards React /
            Node / JAMStack Development, mostly building sites with React. In
            the past I have worked with many other stacks and languages and am
            even fluent in a few. I am also knowledgeable about SQL/NoSQL
            databases, PHP, and *nix systems. Currently I'm putting a lot of
            effort into learning more about UI state machines.
          </p>
          <p>
            In the past, my love of all things technological have taken me into
            forays in business and education as well as development. I co-owned
            a fantastic Web shop in NYC for a while, and I am honored to have
            worked on the faculty of Parsons School of Design, California
            College of the Arts, UC Berkeley, and Academy of Art University. I
            am a great fit for a role as a developer, leader, strategist, or
            evangelist, with strengths that play well to digital studios and
            media- or education-focused companies.
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
              <a href="mailto:dave@davekanter.com" className="icon fa-envelope">
                <span className="label">E-mail</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kanter/"
                className="icon fa-linkedin"
              >
                <span className="label">Linked In</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/raydot" className="icon fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/raydot" className="icon fa-github">
                <span className="label">GitHub</span>
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
