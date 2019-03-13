const express = require('express');
const bodyParser = require('body-parser');
require('./db');

const app = express();
const apolloServer = require('./graphql/apolloServer');

app.set('trust proxy', true);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apolloServer.applyMiddleware({ app });

app.get('/hello', (req, res) => {
  res.json({ hello: 'word' });
});

app.listen(3009, () => {
  console.log('app listen on port: 3009');
});

module.exports = app;
