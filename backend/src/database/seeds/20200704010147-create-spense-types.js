module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'expense_types',
      [
        {
          id: 1,
          name: 'Despesas',
          constant: 'DESPESAS',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Folha',
          constant: 'FOLHA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Impostos',
          constant: 'IMPOSTOS',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Despesas variáveis',
          constant: 'DESPESAS_VARIAVEIS',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Pós venda',
          constant: 'POS_VENDA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Publicidade',
          constant: 'PUBLICIDADE',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: 'Despesa de veículo não vendido',
          constant: 'DESPESA_VEICULO_NAO_VENDIDO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: 'Despesa de veículo vendido',
          constant: 'DESPESA_VEICULO_VENDIDO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: 'Multa paga',
          constant: 'MULTA_PAGA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          name: 'Multa não paga',
          constant: 'MULTA_NAO_PAGA',
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
