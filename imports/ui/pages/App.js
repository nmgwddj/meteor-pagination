import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MainLayout from '../layouts'

const App = () =>
  <Router>
    <Route path='/' component={MainLayout} />
  </Router>

export default App
