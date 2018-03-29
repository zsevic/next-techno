import React, { Component } from 'react'

import 'bootstrap'

export default class FooterComponent extends Component {
  render () {
    return (
      <footer className='mastfoot mt-auto'>
        <div className='inner'>
          <p>
            Cover template for <a href='https://getbootstrap.com/'>Bootstrap</a>,
            by <a href='https://twitter.com/mdo'>@mdo</a>.
          </p>
        </div>
      </footer>
    )
  }
}
