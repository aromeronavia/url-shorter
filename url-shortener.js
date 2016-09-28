const crypto = require('crypto');

const urlShortener = url => {
  const hash = crypto.createHash('md5').update(url).digest('hex');
  return hash.slice(0, 6);
};

module.exports = urlShortener;
