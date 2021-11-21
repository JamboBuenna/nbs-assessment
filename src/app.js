require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const app = express()
const expressSwagger = require('express-swagger-generator')(app);

/*
  If the primary use case of this service is to handle large JSON dumps, I'd set a larger limit like this,
  but every service still should have a reasonable / fair use cap. If the service wanted to handle larger JSON
  inputs, I'd refactor the code / service accordingly.
 */
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb', extended: true }))

const PORT = process.env.PORT

app.use(logger('dev'))

app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded

const healthRouter = require('./routes/health')
app.use('/health', healthRouter)

const jsonRouter = require('./routes/json')
app.use('/json', jsonRouter)

router.use('/api-docs', swaggerUi.serve)
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'nbs-assessment',
    version: '0.1.0',
    description:
        'NBS - Project Manager Assessment Exercise',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html'
    },
    contact: {
      name: 'James Nurse',
      email: 'jamesnurse1987@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ]
}

// const options = {
//   swaggerDefinition,
//   // Paths to files containing OpenAPI definitions
//   apis: ['./routes/*.js']
// }

// const swaggerSpec = swaggerJsdoc(options)
// app.use(
//   '/docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// )

/**
 * Swagger
 */
let options = {
  swaggerDefinition: {
    info: {
      description: 'An assessment for James Nurse for the Software Development Manager Role',
      title: 'NBS Assessment',
      version: '1.0.0',
    },
    host: `localhost:3000`,
    basePath: '',
    produces: [
      "application/json",
      "application/xml"
    ],
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};

expressSwagger(options)


app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

module.exports = app
