import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        responsible: Sequelize.STRING,
        image: Sequelize.STRING,
        site: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        phone: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        city: Sequelize.STRING,
        district: Sequelize.STRING,
        uf: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        latitude: Sequelize.DECIMAL,
        longitude: Sequelize.DECIMAL,
        provider: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
        expires_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }
}

export default Company;
