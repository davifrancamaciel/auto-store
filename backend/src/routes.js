import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multerConfig'

import authMiddleware from './app/middlewares/auth'

import CompanyController from './app/controllers/CompanyController'
import validateCompanyStore from './app/validators/Company/store'
import validateCompanyUpdate from './app/validators/Company/update'

import RegisterController from './app/controllers/RegisterController'
import validateRegisterStore from './app/validators/Register/store'

import UserController from './app/controllers/UserController'
import validateUserStore from './app/validators/User/store'
import validateUserUpdate from './app/validators/User/update'

import SessionController from './app/controllers/SessionController'
import validateSessionStore from './app/validators/Session/store'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) =>
  res.json({ message: 'Bem vindo a api do Gestão flex' })
)

// rotas publicas
routes.post('/register', validateRegisterStore, RegisterController.store)
routes.post('/sessions', validateSessionStore, SessionController.store)

// rotas privadas
routes.use(authMiddleware)
routes.get('/companies', CompanyController.index)

routes.post(
  '/companies',
  upload.single('file'),
  validateCompanyStore,
  CompanyController.store
)

routes.put(
  '/companies',
  upload.single('file'),
  validateCompanyUpdate,
  CompanyController.update
)
routes.get('/companies/:id', CompanyController.find)
routes.delete('/companies/:id', CompanyController.delete)

routes.get('/users', UserController.index)
routes.post(
  '/users',
  upload.single('file'),
  validateUserStore,
  UserController.store
)
routes.put(
  '/users',
  upload.single('file'),
  validateUserUpdate,
  UserController.update
)
routes.get('/users/:id', UserController.find)

routes.put('/files', upload.single('file'), UserController.index)
export default routes
