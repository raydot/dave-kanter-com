import React from 'react'

import coffandaffer from '../images/coffindaffer.jpg'
import kaiser from '../images/kaiserCardiacCare.png'
import monster from '../images/monsterpoop.jpg'
import opsumit from '../images/opsumithcp.png'
import pahuman from '../images/pahuman.png'
import saxendamoa from '../images/saxendamoa.png'
import starwars from '../images/starwars.png'
import trenchless from '../images/trenchless.jpg'
import urbach from '../images/urbach.jpg'

class Portfolio extends React.component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div class="portfolio-wrapper">
        <div class="portfolio_row">
          <div class="portfolio-column">
            <div class="column one">One</div>
          </div>
        </div>
        <div class="portfolio_row">
          <div class="portfolio-column">
            <div class="column two">Two</div>
          </div>
        </div>
        <div class="portfolio_row">
          <div class="portfolio-column">
            <div class="column three">Three</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Portfolio
