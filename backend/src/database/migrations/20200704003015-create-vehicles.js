module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // enpresa do veiculo
      company_id: {
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      km: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      combustivel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_compra: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      valor_venda: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      data_entrada: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      data_saida: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      recibo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      manual: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cnh_copia: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      quantidade_oleo: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      opicionais: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tipo: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('vehicles');
  },
};
