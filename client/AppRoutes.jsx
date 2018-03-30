import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeComponent from './components/HomeComponent'
import ProfileComponent from './components/ProfileComponent'
import EventsComponent from './components/EventsComponent'
// import NavbarComponent from './components/Navbar'
import TestComponent from './components/TestComponent'
import ConnectComponent from './components/ConnectComponent'
import ContactComponent from './components/ContactComponent'
import NotFoundComponent from './components/NotFoundComponent'
import './style.css'

export default class AppRoutes extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomeComponent} />
          <Route path='/profile' name='profile' component={ProfileComponent} />
          <Route path='/events' name='events' component={EventsComponent} />
          <Route path='/test' name='test' component={TestComponent} />
          <Route path='/connect' name='connect' component={ConnectComponent} />
          <Route path='/contact' name='contact' component={ContactComponent} />
          <Route path='*' component={NotFoundComponent} />
        </Switch>
      </div>
    )
  }
}
