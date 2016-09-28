const connectionString = 'postgres://alberto:Setzer789&@localhost:5432/shortened_urls';
const pgp = require('pg-promise')();
const db = pgp(connectionString);

const database = {
  searchForExistentHash: hash => {
    return db.oneOrNone('SELECT * FROM short_url where hash=$1', hash);
  },
  insertHashAndOriginalURL: args => {
    return db.one('INSERT INTO short_url (hash, original_url, visits)' +
      'values (${hash}, ${url}, 0) RETURNING *', args);
  }
};

module.exports = database;
