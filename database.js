const connectionString = 'postgres://alberto:Setzer789&@localhost:5432/shortened_urls';
const pgp = require('pg-promise')();
const db = pgp(connectionString);

const database = {
  insertHashAndOriginalURL: args => {
    return db.oneOrNone('INSERT INTO short_url (hash, original_url, visits)' +
      'values (${hash}, ${originalURL}, 0)', args);
  }
};

module.exports = database;
