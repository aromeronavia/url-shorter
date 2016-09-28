const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));

const createShortenedURL = require('./create-shortened-url');
const searchRedirectHash = require('./search-redirect-hash');
const listUrls = require('./list-urls');

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(200);
});

app.get('/admin', (req, res) => {
  console.log('/admin');
  res.sendFile(buildRouteURL('admin.html'));
});

app.get('/admin/urls', (req, res) => {
  console.log('/admin/urls');
  listUrls()
    .then(result => res.status(200).json({urls: result}))
    .catch(error => {
      console.log('/admin/urls error', error);
      res.sendFile(buildRouteURL('index.html'));
    });
});

app.get('/:hash', (req, res) => {
  const {hash} = req.params;
  console.log('searching for hash', hash);
  searchRedirectHash(hash)
    .then(url => res.redirect(url))
    .catch(() => {
      return res.sendFile(buildRouteURL('index.html'));
    });
});

app.get('/', (req, res) => {
  res.sendFile(buildRouteURL('index.html'));
});

const isURL = string => {
  const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(string);
};

app.post('/short', (req, res) => {
  const {url} = req.body;
  if (!isURL(url)) return res.status(500).json({error: 'Field is not URL'});
  console.log('Shorting url', url);
  createShortenedURL(url)
    .then(result => res.status(200).json(result))
    .catch(_buildError(res));
});

const _buildError = res => error => {
  return res.status(500).json({error: error});
};

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const buildRouteURL = s => `${__dirname}/${s}`;

module.exports = app;
