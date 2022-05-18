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

// Func
const getTalkers = () => fs.readFile('./talker.json', 'utf8')
    .then((fileContent) => JSON.parse(fileContent));

// Requisito 1
app.get('/talker', (_req, res) => {
  getTalkers()
    .then((talkers) => res.status(200).json(talkers))
    .catch((_err) => res.status(500).end());
});

// Requisito 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  getTalkers()
    .then((talkers) => {
      const talkerById = talkers.find((p) => p.id === Number(id));
      if (!talkerById) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return res.status(200).json(talkerById);
    })
    .catch((_err) => res.status(404).end());
});

app.listen(PORT, () => {
  console.log('Online');
});
