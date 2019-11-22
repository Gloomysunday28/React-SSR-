import React from 'react'
import {NavLink} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return <div>
      <NavLink to="/foo">Foo</NavLink>
      <NavLink to="/async">AsyncTwo</NavLink>
      Home
      {this.props.children}
    </div>
  }
}

export default Home
