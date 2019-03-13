const r = require('require-all');
const path = require('path');

const filter = /(.+)\.js$/;

module.exports = r({ dirname: path.join(__dirname, 'directives'), filter });
