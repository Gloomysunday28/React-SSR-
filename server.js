const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const express = require('express')
const render = require('./dist/node.js')

const html = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf-8')
const app = express()
app.use(express.static('./dist')) // 引入JS的根路径

const HTML_Template = function(content, initialData) {
  return ejs.render(html, {
    ssrContent: content,
    initialData
  })
}

app.get('*', async (req, res) => {
  const { content, initialData } = await render.render(req.originalUrl)
  
  const htmlTemplate =  HTML_Template(content, initialData)
  res.send(htmlTemplate)
})

app.listen(3000)
