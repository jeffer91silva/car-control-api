const express = require('express');
const router = express.Router();
const automoveis = require('../database/automoveisDB');
const motoristas = require('../database/motoristasDB');
const utilizacoes = require('../database/utilizacoesDB');

router.post('/reset', (_req, res) => {
  automoveis.splice(0, automoveis.length);
  motoristas.splice(0, motoristas.length);
  utilizacoes.splice(0, utilizacoes.length);
  res.json({ ok: true, message: 'Dados em memória resetados.' });
});

module.exports = router;
