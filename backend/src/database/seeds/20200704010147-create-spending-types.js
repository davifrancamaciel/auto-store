module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'spending_types',
      [
        { nome: 'Despesas', created_at: new Date(), updated_at: new Date() },
        { nome: 'Folha', created_at: new Date(), updated_at: new Date() },
        { nome: 'Impostos', created_at: new Date(), updated_at: new Date() },
        {
          nome: 'Despesas variáveis',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { nome: 'Pós venda', created_at: new Date(), updated_at: new Date() },
        { nome: 'Publicidade', created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('spending_types', null, {});
  },
};
