import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        company_id: Sequelize.STRING,
        spending_type_id: Sequelize.STRING,
        valor: Sequelize.STRING,
        created_at: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Company;
