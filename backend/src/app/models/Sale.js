import Sequelize, { Model } from 'sequelize'

class Sale extends Model {
  static init (sequelize) {
    super.init(
      {
        company_id: Sequelize.NUMBER,
        vehicle_id: Sequelize.NUMBER,
        user_id: Sequelize.NUMBER,
        financed_value: Sequelize.DECIMAL,
        value: Sequelize.DECIMAL,
        sale_date: Sequelize.DATE,
        origin: Sequelize.STRING,
      },
      { sequelize }
    )

    return this
  }
  static associate (models) {
    this.belongsTo(models.Vehicle, { foreignKey: 'company_id', as: 'company' })
    this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' })
    this.belongsTo(models.Vehicle, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Sale
