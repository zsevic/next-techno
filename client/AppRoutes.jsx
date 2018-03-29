import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeComponent from './components/HomeComponent'
import AboutComponent from './components/AboutComponent'
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
          <Route path='/about' name='about' component={AboutComponent} />
          <Route path='/test' name='test' component={TestComponent} />
          <Route path='/connect' name='connect' component={ConnectComponent} />
          <Route path='/contact' name='contact' component={ContactComponent} />
          <Route path='*' component={NotFoundComponent} />
        </Switch>
      </div>
    )
  }
}
