const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/auth');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  console.error('Handling errors: ', err.message, err.name);

  res.status(500).json({ message: err.message })
})

module.exports = app
