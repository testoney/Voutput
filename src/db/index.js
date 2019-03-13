const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const db = {};

function logging(message, benchmark) {
  console.log(`${message} Elapsed time: ${benchmark} ms`);
}

const sequelize = new Sequelize('verbo', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  pool: {
    max: 3,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
  benchmark: true,
  operatorsAliases: Sequelize.Op,
  logging,
  retry: {
    max: 2,
  },
});

fs
  .readdirSync(path.join(__dirname, 'models'))
  // .filter((file) => {
  //   return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  // })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, 'models', file));
    db[file.substring(0, file.length - 3)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.modelNames = Object.keys(db);

db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ alter: true });
    console.log('MySQL Connection succeed.');
  })
  .catch((err) => {
    console.error('MySQL Unable to connect to the database:', err);
  });

module.exports = db;
