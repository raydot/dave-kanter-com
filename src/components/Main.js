import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import OptimizedImage from './OptimizedImage'
import Portfolio from './Portfolio'

// Lazy load ContactForm to defer reCAPTCHA loading
const ContactForm = lazy(() => import('./ContactForm'))

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
            <OptimizedImage src="/images/the_cyber.png" alt="introduction" width={480} height={160} priority={true} />
          </span>
          <p>
            I&apos;m a full-stack developer who enjoys tackling complex problems across 
            different industries. Over the past 20+ years, I&apos;ve worked on everything 
            from high-traffic sites like starwars.com to enterprise Next.js applications 
            for Fortune 500 clients. Currently I&apos;m putting a lot of effort into learning 
            more about artificial intelligence.
          </p>
          <p>
            What makes my background a bit different is the mix of hands-on development 
            with teaching and leadership roles. I&apos;ve spent about 20 years teaching at 
            places like Parsons School of Design, Academy of Art University, and UC Berkeley, which has 
            really sharpened my ability to communicate complex technical ideas clearly 
            and work effectively with diverse teams. I&apos;ve also run my own consulting 
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
            <OptimizedImage src="/images/that_face.png" alt="" width={625} height={208} loading="lazy" />
          </span>
          <p>
Dave lives in Marin County with his family and pets. Away from the computer, he likes 
to cook, read, hike, play music and lose at chess. Over the past several years he&apos;s even gotten pretty good at not trying to do all of those things at exact same time.
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
          <Suspense fallback={<div>Loading contact form...</div>}>
            <ContactForm onCloseArticle={props.onCloseArticle} />
          </Suspense>
          <ul className="icons">
            <li>
              <a href="mailto:dave@davekanter.com" aria-label="Email">
                <span className="label">
                  <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kanter/" aria-label="LinkedIn">
                <span className="label">
                  <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/raydot" aria-label="Twitter">
                <span className="label">
                  <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a href="https://github.com/raydot" aria-label="GitHub">
                <span className="label">
                  <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
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
