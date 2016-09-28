const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));

const createShortenedURL = require('./create-shortened-url');

app.get('/', (req, res) => {
  res.sendFile(buildRouteURL('index.html'));
});

app.post('/short', (req, res) => {
  const {url} = req.body;
  createShortenedURL(url)
    .then(result => res.status(200).json(result))
    .catch(_buildError(res));
});

const _buildError = res => error => {
  return res.status(500).json({error: error});
};

app.get('/admin', (req, res) => {

});

app.get('/*', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const buildRouteURL = s => `${__dirname}/${s}`;

module.exports = app;
