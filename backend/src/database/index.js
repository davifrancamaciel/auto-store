import Sequelize from 'sequelize'

import databaseConfig from '../config/database'
import Company from '../app/models/Company'
import User from '../app/models/User'
import Vehicle from '../app/models/Vehicle'
import Expense from '../app/models/Expense'
import ExpenseType from '../app/models/ExpenseType'

const models = [Company, User, Vehicle, Expense, ExpenseType]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
