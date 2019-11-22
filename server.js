// const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const express = require('express')
const render = require('./server/node.js')

// const html = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf-8')
const app = express()
app.use(express.static('./dist')) // 引入JS的根路径

// const HTML_Template = function(content, initialData) {
//   return ejs.render(html, {
//     ssrContent: content,
//     initialData
//   })
// }

const preloadJS = []
const prefetchJS = []

fs.readdir(path.resolve(__dirname, './dist'), 'utf-8', (err, files) => {
  const jsFiles = (files || []).filter(file => {
    const {
      name,
      ext
    } = path.parse(file)
    return ext === '.js' && name !== 'node'
  })

  jsFiles.forEach(file => {
    const {
      name
    } = path.parse(file)

    if (name === 'browser') preloadJS.push(file)
    else prefetchJS.push(file)
  })
})

app.get('*', async (req, res) => {
  const { content, initialData } = await render.render(req.originalUrl)

  res.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/main.css"/>
    ${preloadJS.map(v => (`<link rel="preload" href="/${v}" as="script">`)).join('\n')}
    ${prefetchJS.map(v => (`<link rel="prefetch" href="/${v}">`)).join('\n')}
    <title>Document</title>
  </head>
  <body>
    <div id="root">`)
  
  content.pipe(res, {end: false})
  content.on('end', () => {
    res.write(`</div>
    ${initialData}
    <script src="/browser.js"></script>
    </body>
    `)
    res.end()
  })
})

app.listen(3000)
