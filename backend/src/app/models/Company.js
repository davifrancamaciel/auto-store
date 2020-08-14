import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        responsavel: Sequelize.STRING,
        image: Sequelize.STRING,
        site: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        telefone: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        city: Sequelize.STRING,
        bairro: Sequelize.STRING,
        uf: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        complement: Sequelize.STRING,
        cep: Sequelize.STRING,
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
