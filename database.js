const connectionString = 'postgres://alberto:Setzer789&@localhost:5432/shortened_urls';
const pgp = require('pg-promise')();
const db = pgp(connectionString);

const database = {
  listUrls: () => {
    return db.manyOrNone('SELECT * FROM short_url');
  },
  searchForExistentHash: hash => {
    return db.oneOrNone('SELECT * FROM short_url where hash=$1', hash);
  },
  searchForOriginalURL: url => {
    return db.oneOrNone('SELECT * FROM short_url where original_url=$1', url);
  },
  insertHashAndOriginalURL: args => {
    return db.one('INSERT INTO short_url (hash, original_url, visits)' +
      'values (${hash}, ${url}, 0) RETURNING *', args);
  }
};

module.exports = database;
