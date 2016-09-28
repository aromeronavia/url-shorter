const urlShortener = require('./url-shortener');
const database = require('./database');

const createShortenedURL = url => {
  return new Promise((resolve, reject) => {
    database.searchForOriginalURL(url)
      .then(result => {
        if (result) return resolve(result);
        const hash = urlShortener(url);
        database.insertHashAndOriginalURL({url, hash})
          .then(resolve)
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
  });
};

module.exports = createShortenedURL;
