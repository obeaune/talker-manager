const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const tokenGenerator = require('./tokenGenerator');
const { validateEmail, validatePassword } = require('./validate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// iniciando o projeto vamos com tudo!
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Função com fs.readFile
const getTalkers = () => fs.readFile('./talker.json', 'utf8')
    .then((fileContent) => JSON.parse(fileContent));

// Requisito 1
app.get('/talker', (_req, res) => {
  getTalkers()
    .then((talkers) => res.status(200).json(talkers))
    .catch((err) => res.status(500).json({ erro: err.message }));
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
    .catch((err) => res.status(404).json({ erro: err.message }));
});

// Requisito 3 e 4
app.post('/login', validateEmail, validatePassword, tokenGenerator, (req, res) => {
  const { newToken } = req;
  res.status(200).json({ token: newToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
