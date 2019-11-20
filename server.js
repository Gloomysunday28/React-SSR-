const express = require('express')
const render = require('./dist/node.js')

const app = express()
app.use(express.static('./dist')) // 引入JS的根路径

app.get('*', (req, res) => {
  const url = req.originalUrl === '/favicon.ico' ? '/' : req.originalUrl
  const content = render.render(url)
  
  const htmlTemplate = `<!DOCTYPE html>
   <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/main.css"/>
    </head>
    <body>
    <div id="root">${content}</div>
    <!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件-->
    <script src="/browser.js"></script>
    </body>
    </html>`

  res.send(htmlTemplate)
})


app.listen(3000)