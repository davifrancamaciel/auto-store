import Sequelize, { Model } from 'sequelize'

class Sale extends Model {
  static init (sequelize) {
    super.init(
      {
        company_id: Sequelize.NUMBER,
        vehicle_id: Sequelize.NUMBER,
        user_id: Sequelize.NUMBER,
        next_exchange_oil: Sequelize.STRING,
        value: Sequelize.DECIMAL,
        financed_value: Sequelize.DECIMAL,
        financed_value_description: Sequelize.STRING,
        financed_value_financial: Sequelize.DECIMAL,
        input_value: Sequelize.DECIMAL,
        input_value_description: Sequelize.STRING,
        vehicle_input_value: Sequelize.STRING,
        vehicle_input_value_description: Sequelize.STRING,
        sale_date: Sequelize.DATE,
        origin: Sequelize.STRING,
        last_crlv: Sequelize.STRING,
        paid_out_ipva: Sequelize.STRING,
        delivered_receipt: Sequelize.BOOLEAN,
        checklist_delivery: Sequelize.BOOLEAN,
        checklist_auto: Sequelize.BOOLEAN,
        alienation_low: Sequelize.BOOLEAN,
        report_take_care: Sequelize.BOOLEAN,
        report_precautionary: Sequelize.BOOLEAN,
        there_anything: Sequelize.BOOLEAN,
        discounted_sale_value: Sequelize.BOOLEAN,
        not_discounted_sale_value: Sequelize.BOOLEAN,
        additional_note: Sequelize.STRING,
      },
      { sequelize }
    )

    return this
  }
  static associate (models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' })
    this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Sale
