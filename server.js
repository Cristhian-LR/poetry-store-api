

const { ApolloServer } = require('apollo-server');

const typeDefs  = require('./src/graphql/typeDefs/index.js');
const resolvers = require('./src/graphql/resolvers/index.js');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url} 🚀`);
});