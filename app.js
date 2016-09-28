const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(buildRouteURL('index.html'));
});

app.post('/short', (req, res) => {
  const {url} = req.body;
  createShortenedUrl(url)
});

app.get('/admin', (req, res) => {

});

app.get('/*', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const buildRouteURL = s => `${__dirname}/${s}`;

module.exports = app;
