const db = require('../../database/db');

const resolvers = {
  Query: {
    // 2.3 – consultas sobre tablas
    getCustomers: async () => await db.select().table('Customer'),
    getCustomer:  async (_, { id }) => await db('Customer').where({ customer_code: id }).first(),

    getPoems: async () => await db.select().table('Poem'),
    getPoem:  async (_, { id }) => await db('Poem').where({ poem_code: id }).first(),

    getPoets: async () => await db.select().table('Poet'),
    getPoet:  async (_, { id }) => await db('Poet').where({ poet_code: id }).first(),

    getSales:        async () => await db.select().table('Sale'),
    getPublications: async () => await db.select().table('Publication'),

    // 2.4 – procedimientos almacenados
    getPoetPoem:        async () => { const r = await db.raw('CALL sp_GetPoetPoem()');        return r[0][0]; },
    getSaleCustomer:    async () => { const r = await db.raw('CALL sp_GetSaleCustomer()');    return r[0][0]; },
    getPublicationPoem: async () => { const r = await db.raw('CALL sp_GetPublicationPoem()'); return r[0][0]; },
  },

  Mutation: {
    // 2.5 – altas
    createPoet: async (_, args) => {
      const [id] = await db('Poet').insert(args);
      return db('Poet').where({ poet_code: id }).first();
    },
    createPoem: async (_, args) => {
      const [id] = await db('Poem').insert(args);
      return db('Poem').where({ poem_code: id }).first();
    },
    createCustomer: async (_, args) => {
      const [id] = await db('Customer').insert(args);
      return db('Customer').where({ customer_code: id }).first();
    },
    createSale: async (_, args) => {
      const [id] = await db('Sale').insert(args);
      return db('Sale').where({ sale_code: id }).first();
    },

    // 2.6 – modificaciones
    updateCustomer: async (_, { customer_code, ...fields }) => {
      await db('Customer').where({ customer_code }).update(fields);
      return db('Customer').where({ customer_code }).first();
    },
    updatePublication: async (_, { publication_code, ...fields }) => {
      await db('Publication').where({ publication_code }).update(fields);
      return db('Publication').where({ publication_code }).first();
    },
    updateSale: async (_, { sale_code, ...fields }) => {
      await db('Sale').where({ sale_code }).update(fields);
      return db('Sale').where({ sale_code }).first();
    },

    // 2.7 – Bajas
    deletePoemPublication: async (_, { poem_code, publication_code }) => {
      await db('Poem_Publication').where({ poem_code, publication_code }).del();
      return `Relación Poem(${poem_code}) – Publication(${publication_code}) eliminada`;
    },
    deleteSalePublication: async (_, { sale_code, publication_code }) => {
      await db('Sale_Publication').where({ sale_code, publication_code }).del();
      return `Relación Sale(${sale_code}) – Publication(${publication_code}) eliminada`;
    },
  },
};

module.exports = resolvers;