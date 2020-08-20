import Sequelize, { Model } from 'sequelize'

class Vehicle extends Model {
  static init (sequelize) {
    super.init(
      {
        company_id: Sequelize.NUMBER,
        brand: Sequelize.STRING,
        model: Sequelize.STRING,
        type: Sequelize.STRING,
        fuel: Sequelize.STRING,
        year: Sequelize.INTEGER,
        year_model: Sequelize.INTEGER,
        board: Sequelize.STRING,
        km: Sequelize.DECIMAL,
        value: Sequelize.DECIMAL,
        input_date: Sequelize.DATE,
        description: Sequelize.STRING,
        optional: Sequelize.STRING,
        amount_oil: Sequelize.DECIMAL,
        receipt: Sequelize.BOOLEAN,
        manual: Sequelize.BOOLEAN,
        key_copy: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
      },
      { sequelize }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' })
  }
}

export default Vehicle
