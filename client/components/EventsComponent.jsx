import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap'
import './HomeComponent.css'
import './EventsComponent.css'

export default class EventsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    axios.get('/api/events').then(res => {
      this.setState({
        events: res.data
      })

      let events = document.querySelector('.events')

      this.state.events.forEach((event, index) => {
        let datetime = new Date(Date.parse(event.start_time))
        let minutes = datetime.getMinutes()
        let hours =
          datetime.getHours() + 1 === 24 ? 0 : datetime.getHours() + 1
        let day = datetime.getDate()
        let month = datetime.getMonth() + 1
        let year = datetime.getFullYear()

        events.innerHTML += `<div class="card text-white bg-info mb-3 col-xs-12">
        <div class="card-header">
        <p><strong>event</strong>:
        <a href="https://facebook.com/events/${
  event.eventId
}" class="card-text">${event.name}</a>
        </p>
        </div>
        <div class="card-body">
          <p class="card-text">
            <strong>place</strong>:
            ${event.place}
          </p>
          <p class="card-text">
            <strong>date</strong>:
            ${day}.${month}.${year}.
          </p>
          <p class="card-text">
            <strong>start time</strong>:
            ${hours}:${minutes < 10 ? '0' + minutes : minutes}h
          </p>
        </div>
      </div>`
      })
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='jumbotron text-center bg-info text-white jumbo'>
          <h2>
            <span className='fa fa-volume-up' /> Nextechno
          </h2>
          <p>Upcoming techno events in Belgrade</p>
          <a className='btn' href='/auth/logout'>
            <span className='row1'>
              <span className='fa fa-sign-out' /> Logout
            </span>
          </a>
        </div>

        <div className='events card-columns' />
      </div>
    )
  }
}
