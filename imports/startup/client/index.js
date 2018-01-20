import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '../../ui/pages/App'

Meteor.startup(() => {
  render (
    <App />,
    document.getElementById('render-target')
  )
})