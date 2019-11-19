import React from 'react'
import {Switch, Route, Router} from 'react-router'
import './index.css'

class App extends React.Component {
  state = {
    lists: []
  }
  
  render() {
    return <Router>
      <Switch>
        <Route exact component={() => import('./Home')}/>
      </Switch>
    </Router>
  }
}

export default App
