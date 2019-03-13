// const schema = require('./schema');
// const { ApolloServer } = require('apollo-server-express');

// const genLoaders = require('./genLoaders');

// const server = new ApolloServer({
//   schema,
//   context: async () => {
//     const context = {
//       loaders: genLoaders(),
//     };
//     return context;
//   },
//   introspection: true,
//   playground: {
//     endpoint: 'http://localhost:3009/graphql',
//     settings: {
//       'editor.theme': 'light',
//     },
//   },
// });

// module.exports = server;
