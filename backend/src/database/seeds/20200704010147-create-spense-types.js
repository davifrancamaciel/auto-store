module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'expense_types',
      [
        {
          id: 1,
          name: 'Despesas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Folha',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Impostos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Despesas variáveis',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Pós venda',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Publicidade',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('spending_types', null, {})
  },
}
