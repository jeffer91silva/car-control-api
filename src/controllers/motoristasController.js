const { v4: uuidv4 } = require('uuid');
const motoristas = require('../database/motoristasDB');

exports.create = (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
  const novo = { id: uuidv4(), nome };
  motoristas.push(novo);
  res.status(201).json(novo);
};

exports.list = (req, res) => {
  const { nome, sort, order } = req.query;
  let lista = [...motoristas];
  if (nome) lista = lista.filter(m => m.nome.toLowerCase().includes(nome.toLowerCase()));

  if (sort) {
    const ord = (order || 'asc').toLowerCase() === 'desc' ? -1 : 1;
    lista.sort((a,b) => {
      const av = (a[sort] ?? '').toString().toLowerCase();
      const bv = (b[sort] ?? '').toString().toLowerCase();
      if (av < bv) return -1 * ord;
      if (av > bv) return 1 * ord;
      return 0;
    });
  }
  res.json(lista);
};

exports.get = (req, res) => {
  const { id } = req.params;
  const item = motoristas.find(m => m.id === id);
  if (!item) return res.status(404).json({ erro: 'Motorista não encontrado' });
  res.json(item);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const i = motoristas.findIndex(m => m.id === id);
  if (i === -1) return res.status(404).json({ erro: 'Motorista não encontrado' });
  motoristas[i] = { ...motoristas[i], ...req.body };
  res.json(motoristas[i]);
};

exports.remove = (req, res) => {
  const { id } = req.params;
  const i = motoristas.findIndex(m => m.id === id);
  if (i === -1) return res.status(404).json({ erro: 'Motorista não encontrado' });
  motoristas.splice(i, 1);
  res.status(204).send();
};
