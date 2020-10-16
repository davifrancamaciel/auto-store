import Sequelize, { Model } from 'sequelize';

class ExpenseType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        constant: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default ExpenseType;
