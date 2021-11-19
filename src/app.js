require('dotenv').config()
const express = require('express')
const logger = require('morgan')

const app = express()

/*
  If the primary use case of this service is to handle large JSON dumps, I'd set a larger limit like this,
  but every service still should have a reasonable / fair use cap. If the service wanted to handle larger JSON
  inputs, I'd refactor the code / service accordingly.
 */
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

const PORT = process.env.PORT


app.use(logger('dev'))

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded

const healthRouter = require('./routes/health')
app.use('/health', healthRouter)

const jsonRouter = require('./routes/json')
app.use('/json', jsonRouter)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

module.exports = app
