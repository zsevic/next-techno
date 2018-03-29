import React, { Component } from 'react'

import 'bootstrap'
import './HomeComponent.css'

export default class HomeComponent extends Component {
  render () {
    return (
      <div class='overlay'>
        <div class='overlay__inner'>
          <h2>
            <span class='fa fa-volume-up' /> Nextechno
          </h2>
          <p>Find techno events in Belgrade</p>
          <a href='/auth/facebook' class='btn'>
            <span class='row1'>
              <span class='fa fa-facebook' /> Connect with Facebook
            </span>
          </a>
        </div>
      </div>
    )
  }
}
