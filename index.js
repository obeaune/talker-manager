const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// iniciando o projeto vamos com tudo!
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalkers = () => fs.readFile('./talker.json', 'utf8')
    .then((fileContent) => JSON.parse(fileContent));

// 1
app.get('/talker', (_req, res) => {
  getTalkers()
    .then((talkers) => res.status(200).json(talkers))
    .catch((_err) => res.status(500).end());
});

app.listen(PORT, () => {
  console.log('Online');
});
