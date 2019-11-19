import React from 'react'
import { renderToString } from 'react-dom/server';
import App from './App'
import './index.css'

export function render() {
  // 把根组件渲染成 HTML 字符串
  return renderToString(<App/>)
}