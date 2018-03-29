import React, { Component } from 'react'

export default class LayoutComponent extends Component {
  render () {
    return (
      <div className='app-container'>
        {/* Navbar */}
        <div className='navbar'>
                    This is navbar
        </div>
        {/* AppContent */}
        <div className='app-content'>
          {this.props.children}
        </div>
        {/* Footer */}
        <div className='footer'>
                    This is Footer
        </div>
      </div>
    )
  }
}
