import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers'
import './index.css'

class App extends React.Component {
  state = {
    lists: []
  }
  
  render() {
    return <BrowserRouter>
      <Router />
    </BrowserRouter>
  }
}

export default App
