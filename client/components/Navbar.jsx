import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class NavbarComponent extends Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'
                aria-expanded='false'
              >
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <a className='navbar-brand' href='#'>
                Backstarter
              </a>
            </div>
            <div
              className='collapse navbar-collapse'
              id='bs-example-navbar-collapse-1'
            >
              <ul className='nav navbar-nav navbar-right'>
                <li>
                  <a href='/about'>About</a>
                </li>
                <li>
                  <a href='/contact'>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
