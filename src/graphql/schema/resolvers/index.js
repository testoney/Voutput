const r = require('require-all');
const path = require('path');

const filter = /(.+)\.js$/;
const Query = r({ dirname: path.join(__dirname, 'Query'), filter });
const Mutation = r({ dirname: path.join(__dirname, 'Mutation'), filter });
const types = r({ dirname: path.join(__dirname, 'types'), filter });

const resolvers = Object.assign({
  Query,
  Mutation,
}, types);

module.exports = resolvers;
