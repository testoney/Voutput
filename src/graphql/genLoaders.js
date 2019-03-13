const db = require('../db');

const DataLoader = require('dataloader');

async function findIdsMap(model, ids) {
  const data = await model.findAll({ where: { id: ids } });
  const map = {};
  data.forEach((row) => {
    map[row.id] = row;
  });
  return map;
}

async function findIdsList(model, ids) {
  const data = await findIdsMap(model, ids);
  return ids.map(id => data[id] || null);
}

function genLoaders() {
  return {
    ...db.modelNames.reduce((map, model) => {
      map[model] = new DataLoader(keys => findIdsList(db[model], keys));
      return map;
    }, {}),
  };
}

module.exports = genLoaders;
