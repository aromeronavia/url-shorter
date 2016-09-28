const database = require('./database');

const searchRedirectHash = hash => {
  return new Promise((resolve, reject) => {
    database.searchForExistentHash(hash)
      .then(data => {
        console.log(data);
        if (data) return resolve(data.original_url);
        reject({error: 'No url found'});
      })
      .catch(error => {
        console.log(error);
        reject({error});
      });
  });
};

module.exports = searchRedirectHash;
