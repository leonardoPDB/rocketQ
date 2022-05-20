const express = require('express')
const res = require('express/lib/response')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')
const route = express.Router()

route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
route.get('/criar-sala', (req, res) =>
  res.render('index', { page: 'create-pass' })
)
route.post('/criar-sala', roomController.create)
route.get('/sala/:room', roomController.open)
route.post('/entrar-na-sala', roomController.enter)
// criar pergunta
route.post('/pergunta/criar/:room', questionController.create)
// Formato do formulário da modal
route.post('/pergunta/:room/:question/:action', questionController.index)

module.exports = route
