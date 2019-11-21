import React from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Home from '../components/Home'
import Foo from '../components/Foo'

const routers = [{
  path: '/foo',
  exact: false,
  strict: false,
  loadData: Foo.loadData,
  component: Foo,
}]

export { routers }

export default function() {
  return <Switch>
    <Route path="/" component={() => {
      return (<Home>
        {routers.map(router => {
          return (<Route key={router.path} {...router}>
          </Route>)
        })}
      </Home>)
    }}/>
     <Route path="">
      <Redirect to="/" /> 
    </Route>
    <Route path="*" render={() => (<div>404</div>)} />
  </Switch>
}