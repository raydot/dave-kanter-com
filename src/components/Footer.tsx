import React from 'react'

const year = new Date().getFullYear()

interface FooterProps {
  timeout?: boolean
}

const Footer: React.FC<FooterProps> = ({ timeout }) => (
  <footer id="footer" style={timeout ? { display: 'none' } : {}}>
    <p className="copyright">
      Built with{' '}
      <a href="http://www.reactjs.org" target="_new">
        React
      </a>{' '}
      and{' '}
      <a href="https://nextjs.org" target="_new">
        Next.js
      </a>
      . Hosted with{' '}
      <a href="https://www.netlify.com" target="_new">
        Netlify
      </a>
      .
    </p>
    <p className="copyright">All photos &copy;{year} Dave Kanter</p>
  </footer>
)

export default Footer
