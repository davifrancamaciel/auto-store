import 'dotenv/config'

import Youch from 'youch'
import path from 'path'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import bodyParser from 'body-parser'

import routes from './routes'

// Uncomment this line to enable database access
// --------
import './database'

class App {
  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exzip_codetionHandler()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(bodyParser.json())

    // uso de rescursos staticos do servidor para o acesso get de css, imagens ...
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    )
  }

  routes () {
    this.server.use(routes)
  }

  exzip_codetionHandler () {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON()

        return res.status(500).json(errors)
      }

      return res.status(500).json({ error: 'Internal server error' })
    })
  }
}

export default new App().server
