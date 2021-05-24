const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const port = process.env.PORT || 8080
const app = express()

const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:4000' })
app.use(apiProxy)

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'))
})

app.use('/api/*', express.static(path.join(__dirname, 'server')))

app.listen(port)