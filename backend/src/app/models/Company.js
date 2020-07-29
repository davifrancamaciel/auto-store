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
        cep: Sequelize.STRING,
        latitude: Sequelize.DECIMAL,
        longitude: Sequelize.DECIMAL,
        provider: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  // }
}

export default Company;
