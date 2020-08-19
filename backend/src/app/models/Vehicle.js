import Sequelize, { Model } from 'sequelize'

class Vehicle extends Model {
  static init (sequelize) {
    super.init(
      {
        company_id: Sequelize.NUMBER,
        name: Sequelize.STRING,
        ano: Sequelize.STRING,
        modelo: Sequelize.STRING,
        placa: Sequelize.STRING,
        km: Sequelize.STRING,
        combustivel: Sequelize.STRING,
        valor_compra: Sequelize.DECIMAL,
        valor_venda: Sequelize.DECIMAL,
        data_entrada: Sequelize.DATE,
        data_saida: Sequelize.DATE,
        descricao: Sequelize.STRING,
        recibo: Sequelize.BOOLEAN,
        manual: Sequelize.BOOLEAN,
        chave_copia: Sequelize.BOOLEAN,
        quantidade_oleo: Sequelize.DECIMAL,
        opicionais: Sequelize.STRING,
        tipo: Sequelize.STRING,
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
