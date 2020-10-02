import Sequelize, { Model } from 'sequelize';
import bcrypty from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        company_id: Sequelize.NUMBER,
        name: Sequelize.STRING,
        image: Sequelize.STRING,
        email: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        cnh: Sequelize.STRING,
        rg: Sequelize.STRING,
        profession: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        zip_code: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        latitude: Sequelize.DECIMAL,
        longitude: Sequelize.DECIMAL,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypty.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
  }

  checkPassword(password) {
    return bcrypty.compare(password, this.password_hash);
  }
}

export default User;
