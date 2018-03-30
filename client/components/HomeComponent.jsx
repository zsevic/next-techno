import React, { Component } from 'react'

import 'bootstrap'
import './HomeComponent.css'

export default class HomeComponent extends Component {
  render () {
    return (
      <div className='overlay'>
        <div className='overlay__inner'>
          <h2>
            <span className='fa fa-volume-up' /> Nextechno
          </h2>
          <p>Upcoming techno events in Belgrade</p>
          <a href='/auth/facebook' className='btn'>
            <span className='row1'>
              <span className='fa fa-facebook' /> Connect with Facebook
            </span>
          </a>
        </div>
      </div>
    )
  }
}
