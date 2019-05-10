import React from 'react'
import { renderToString } from 'react-dom/server';

class App extends React.Component {
  render() {
    return <div>1</div>
  }
}

export function render() {
  // 把根组件渲染成 HTML 字符串
  return renderToString(<App/>)
}