module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
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
        onDelete: 'CASCADE',
        allowNull: false,
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        references: { model: 'vehicles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      next_exchange_oil: {
        // Próxima troca de Óleo
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      value: {
        // Valor total da venda
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      financed_value: {
        // Valor a Financiar
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      financed_value_description: {
        // descrição do valor financiado
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      financed_value_financial: {
        // Financeira que financiou o valor
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      input_value: {
        // valor de entrada
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      input_value_description: {
        // descrição do valor de entrada
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      vehicle_input_value: {
        // valor do veiculo de entrada
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      vehicle_input_value_description: {
        // descrição do veiculo de entrada
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      origin: {
        // Origem da Venda
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_crlv: {
        // Último CRLV
        type: Sequelize.STRING(4),
        allowNull: true,
      },
      paid_out_ipva: {
        //IPVA PAGO
        type: Sequelize.STRING(4),
        allowNull: true,
      },
      delivered_receipt: {
        // Recibo (CRV) Entregue
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      checklist_delivery: {
        // Checklist de entrega realizado
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      checklist_auto: {
        // CheckAuto
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      alienation_low: {
        //Duda Baixa Alienação
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      report_precautionary: {
        //Laudo Cautelar
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      there_anything: {
        //Nada Consta
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discounted_sale_value: {
        //Abatidas do valor da venda (cliente pagar)
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      not_discounted_sale_value: {
        //Não abatidas (Loja pagar)
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      additional_note: {
        // INFORMAÇÕES ADICIONAIS
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('sales')
  },
}
