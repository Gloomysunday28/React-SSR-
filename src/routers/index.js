import React from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'
import getStaticRoutes from './staticRouters'
// import Foo from '../components/Foo'
import Home from '../components/Home'
const Foo = () => import('../components/Foo')
const AsyncTwo = () => import('../components/AsyncTwo')

const loadComponent = (comp) => {
  return props => <AsyncComponent load={comp}>
    {Component => {
      return <Component {...props}/>
    }}
  </AsyncComponent>
}

const routers = [{
  path: '/foo',
  exact: false,
  strict: false,
  component: loadComponent(Foo),
}, {
  path: '/async',
  exact: false,
  strict: false,
  loadData: AsyncTwo,
  component: loadComponent(AsyncTwo),
}]

const ServerRouer = async function() {
  const staticRouters = await getStaticRoutes(routers)

  return () => <Switch>
    <Route path="/" component={() => {
      return (<Home>
        {staticRouters.map(router => {
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

export { routers, ServerRouer}

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
