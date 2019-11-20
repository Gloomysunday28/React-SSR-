import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server';
// import App from './App'
import Router from './routers'
import './index.css'

export function render(url) {
  // 把根组件渲染成 HTML 字符串
//   console.log('renderToString', renderToString((<StaticRouter location={req.url} context={{title: 'Martin'}}>
//   <Router />
// </StaticRouter>)))/* 2019年11月20日 16时07分38秒 */
  return renderToString((<StaticRouter location={url} context={{title: 'Martin'}}>
    <Router />
  </StaticRouter>))
}