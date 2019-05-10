const express = require('express')
const render = require('./dist/node.js')

const app = express()

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    <div id="root">${render.render()}</div>
    <!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件-->
    <script src="./dist/browser.js"></script>
    </body>
    </html>
  `)
})

app.use(express.static('.')) // 引入JS的根路径

app.listen(3000, e => {
  console.log('You start at localhost:3000')
})