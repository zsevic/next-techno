import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap'
import './HomeComponent.css'

export default class EventsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    axios.get('/api/events').then(res => {
      console.log('alo bree')

      this.setState({
        events: res.data
      })
      console.log(this.state.events)
    })
  }

  render () {
    return (
      <div>
        <h1>This is AboutComponent</h1>
        <Link to='test'>test</Link>
        <a href='/auth/logout'>logout</a>
      </div>
    )
  }
}
