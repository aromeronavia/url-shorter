const database = require('./database');

const listUrls = () => {
  return new Promise((resolve, reject) => {
    database.listUrls()
      .then(resolve)
      .catch(reject);
  });
};

module.exports = listUrls;
