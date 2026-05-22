const { gql } = require('apollo-server');

const typeDefs = gql`

  type Poet {
    poet_code:        Int
    first_name:       String
    surname:          String
    address:          String
    postcode:         String
    telephone_number: String
  }

  type Poem {
    poem_code:     Int
    poem_title:    String
    poem_contents: String
    poet_code:     Int
  }

  type Customer {
    customer_code:    Int
    first_name:       String
    surname:          String
    address:          String
    postcode:         String
    telephone_number: String
  }

  type Sale {
    sale_code:     Int
    date:          String
    amount:        Float
    customer_code: Int
  }

  type Publication {
    publication_code: Int
    title:            String
    price:            Float
  }

  type PoetPoem {
    poet_code:     Int
    first_name:    String
    surname:       String
    poem_code:     Int
    poem_title:    String
    poem_contents: String
  }

  type SaleCustomer {
    sale_code:        Int
    date:             String
    amount:           Float
    customer_code:    Int
    first_name:       String
    surname:          String
    telephone_number: String
  }

  type PublicationPoem {
    publication_code:  Int
    publication_title: String
    price:             Float
    poem_code:         Int
    poem_title:        String
  }

  type Query {
    getCustomers:           [Customer]
    getCustomer(id: Int!):  Customer
    getPoems:               [Poem]
    getPoem(id: Int!):      Poem
    getPoets:               [Poet]
    getPoet(id: Int!):      Poet
    getSales:               [Sale]
    getPublications:        [Publication]
    getPoetPoem:            [PoetPoem]
    getSaleCustomer:        [SaleCustomer]
    getPublicationPoem:     [PublicationPoem]
  }

  type Mutation {
    createPoet(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): Poet
    createPoem(poem_title: String!, poem_contents: String, poet_code: Int!): Poem
    createCustomer(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): Customer
    createSale(date: String!, amount: Float!, customer_code: Int!): Sale
    updateCustomer(customer_code: Int!, first_name: String, surname: String, address: String, postcode: String, telephone_number: String): Customer
    updatePublication(publication_code: Int!, title: String, price: Float): Publication
    updateSale(sale_code: Int!, date: String, amount: Float, customer_code: Int): Sale
    deletePoemPublication(poem_code: Int!, publication_code: Int!): String
    deleteSalePublication(sale_code: Int!, publication_code: Int!): String
  }
`;

module.exports = typeDefs;