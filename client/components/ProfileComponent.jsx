import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap'
import './HomeComponent.css'

export default class ProfileComponent extends Component {
  render () {
    return (
      <div className='overlay container'>
        <div className='overlay__inner'>
          <h2>
            <span className='fa fa-volume-up' /> Nextechno
          </h2>
          <p>Upcoming techno events in Belgrade</p>
          <Link to='events' className='btn'>
            <span className='row1'>
              <span className='fa fa-play' /> Find events
            </span>
          </Link>
          <a className='btn' href='/auth/logout'>
            <span className='row1'>
              <span className='fa fa-sign-out' /> Logout
            </span>
          </a>
        </div>
      </div>
    )
  }
}
