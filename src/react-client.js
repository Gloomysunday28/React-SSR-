import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import actions from './store/actions'
import App from './App'

if (window.initialData) {
  store.dispatch(actions.replaceData(window.initialData))
}

ReactDOM.hydrate(<App/>, document.getElementById('root'))
// hydrate