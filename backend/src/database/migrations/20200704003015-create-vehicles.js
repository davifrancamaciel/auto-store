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
      brand: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      model: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      fuel: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      year_model: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      board: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      km: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      input_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      receipt: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      manual: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      key_copy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      amount_oil: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      optional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.DECIMAL,
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
