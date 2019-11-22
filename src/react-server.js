import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { matchPath  } from 'react-router-dom'
import { renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux'
import { routers, ServerRouer } from './routers'
import './index.css'
import store from './store'

export async function render(url) {
  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routers.some(route => {
    // use `matchPath` here
    const match = matchPath(url, route);
    if (match && route.loadData) promises.push(route.loadData().then(res => {
      res.default.loadData(store, match)
    }))
    return match;
  });
  
  const ServerRouter = await ServerRouer()

  return new Promise((resolve) => {
    Promise.all(promises).then(() => {
      // 把根组件渲染成 HTML 字符串
      resolve({
        content: renderToNodeStream((<Provider store={store}><StaticRouter location={url} context={{title: 'Martin'}}>
          <ServerRouter />
        </StaticRouter></Provider>)),
        initialData: `<script type="text/javascript">
          window.initialData = ${JSON.stringify(store.getState())}
        </script>`
      })
    }).catch(err => {
      console.log('err', err)/* 2019年11月21日 14时55分25秒 */
    })
  }).catch(err => {
    console.log('martin', err)/* 2019年11月21日 14时55分19秒 */
  })
}