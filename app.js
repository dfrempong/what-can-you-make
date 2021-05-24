const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
const apiProxy = createProxyMiddleware('/api/**', { target: 'http://0.0.0.0:4000', changeOrigin: true, })
app.use(apiProxy)

app.use(express.static(path.join(__dirname, 'static')))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'))
})

app.listen(port)