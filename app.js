const express = require('express')
const cors = require('cors')

const { validateBody, validateLogin } = require('./middlewares/validate.mw')
const { createUser, getUser } = require('./controllers/user.controller')

const PORT = 5000
const app = express()

const bodyParser = express.json()

app.use(
  cors({
    origin: '*'
  })
)

app.listen(PORT, () => {
  console.log('Port ' + PORT)
})

app.get('/signin', validateLogin, getUser)

app.post('/signup', bodyParser, validateBody, createUser)
