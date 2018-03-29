import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ConnectComponent extends Component {
  render () {
    return (
      <div>
        <h1>This is ConnectComponent</h1>
        <Link to='about'>About</Link>
        <form method='post' action='/auth/local/connect'>
          <input type='text' name='email' />
          <input type='text' name='password' />
          <input type='submit' value='ajde' />
        </form>
      </div>
    )
  }
}
