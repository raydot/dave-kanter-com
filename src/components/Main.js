import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import cyberImage from '../../public/images/the_cyber.png'
import portraitImage from '../../public/images/that_face.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Portfolio from './Portfolio'
import ContactForm from './ContactForm'

const Main = (props) => {
  const close = (
    <div
      role="button"
      aria-label="close"
      className="close"
      tabIndex="0"
      onKeyDown={() => {
        props.onCloseArticle()
      }}
      onClick={() => {
        props.onCloseArticle()
      }}
    ></div>
  )

  return (
    <div
      ref={props.setWrapperRef}
      id="main"
      style={props.timeout ? { display: 'flex' } : { display: 'none' }}
    >
        <article
          id="intro"
          className={`${props.article === 'intro' ? 'active' : ''} ${
            props.articleTimeout ? 'timeout' : ''
          }`}
        >
          <h2 className="major">Dave Kanter Intro</h2>
          <span className="image main">
            <Image src={cyberImage} alt="introduction" width={480} height={160} />
          </span>
          <p>
            I'm a full-stack developer who enjoys tackling complex problems across 
            different industries. Over the past 20+ years, I've worked on everything 
            from high-traffic sites like starwars.com to enterprise Next.js applications 
            for Fortune 500 clients. Currently I'm putting a lot of effort into learning 
            more about artificial intelligence.
          </p>
          <p>
            What makes my background a bit different is the mix of hands-on development 
            with teaching and leadership roles. I've spent about 20 years teaching at 
            places like Parsons School of Design, Academy of Art University, and UC Berkeley, which has 
            really sharpened my ability to communicate complex technical ideas clearly 
            and work effectively with diverse teams. I've also run my own consulting 
            business and managed technical teams, so I understand both the code and the 
            business side of things.
          </p>
          {close}
        </article>

        <article
          id="work"
          className={`${props.article === 'work' ? 'active' : ''} ${
            props.articleTimeout ? 'timeout' : ''
          }`}
        >
          <h2 className="major">Portfolio</h2>
          <Portfolio />
          {close}
        </article>

        <article
          id="about"
          className={`${props.article === 'about' ? 'active' : ''} ${
            props.articleTimeout ? 'timeout' : ''
          }`}
        >
          <h2 className="major">About</h2>
          <span className="image main">
            <Image src={portraitImage} alt="" width={625} height={208} />
          </span>
          <p>
Dave lives in Marin County with his family and pets. Away from the computer, he likes 
to cook, read, hike, play music and lose at chess. Over the past several years he's even gotten pretty good at not trying to do all of those things at exact same time.
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${props.article === 'contact' ? 'active' : ''} ${
            props.articleTimeout ? 'timeout' : ''
          }`}
        >
          <h2 className="major">Contact</h2>
          <ContactForm />
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

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main
