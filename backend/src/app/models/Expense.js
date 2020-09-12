import Sequelize, { Model } from 'sequelize';

class Expense extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        company_id: Sequelize.NUMBER,
        vehicle_id: Sequelize.NUMBER,
        expense_type_id: Sequelize.NUMBER,
        value: Sequelize.DECIMAL,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ExpenseType, { foreignKey: 'expense_type_id', as: 'type' });
    this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
  }
}

export default Expense;
