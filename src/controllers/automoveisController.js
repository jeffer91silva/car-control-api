const { v4: uuidv4 } = require('uuid');
const automoveis = require('../database/automoveisDB');

exports.create = (req, res) => {
  const { placa, cor, marca } = req.body;
  if (!placa || !cor || !marca) return res.status(400).json({ erro: 'placa, cor e marca são obrigatórios' });
  const novo = { id: uuidv4(), placa, cor, marca };
  automoveis.push(novo);
  res.status(201).json(novo);
};

exports.list = (req, res) => {
  const { cor, marca, sort, order } = req.query;
  let lista = [...automoveis];
  if (cor) lista = lista.filter(a => a.cor === cor);
  if (marca) lista = lista.filter(a => a.marca === marca);

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
  const auto = automoveis.find(a => a.id === id);
  if (!auto) return res.status(404).json({ erro: 'Automóvel não encontrado' });
  res.json(auto);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const i = automoveis.findIndex(a => a.id === id);
  if (i === -1) return res.status(404).json({ erro: 'Automóvel não encontrado' });
  automoveis[i] = { ...automoveis[i], ...req.body };
  res.json(automoveis[i]);
};

exports.remove = (req, res) => {
  const { id } = req.params;
  const i = automoveis.findIndex(a => a.id === id);
  if (i === -1) return res.status(404).json({ erro: 'Automóvel não encontrado' });
  automoveis.splice(i, 1);
  res.status(204).send();
};
