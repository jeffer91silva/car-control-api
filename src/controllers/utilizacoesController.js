const { v4: uuidv4 } = require('uuid');
const utilizacoes = require('../database/utilizacoesDB');
const automoveis = require('../database/automoveisDB');
const motoristas = require('../database/motoristasDB');
const { automovelEmUso, motoristaEmUso } = require('../services/validacoes');

exports.create = (req, res) => {
  const { idAutomovel, idMotorista, motivo } = req.body;

  if (!idAutomovel || !idMotorista || !motivo)
    return res.status(400).json({ erro: 'idAutomovel, idMotorista e motivo são obrigatórios' });

  const auto = automoveis.find(a => a.id === idAutomovel);
  if (!auto) return res.status(404).json({ erro: 'Automóvel não encontrado' });

  const mot = motoristas.find(m => m.id === idMotorista);
  if (!mot) return res.status(404).json({ erro: 'Motorista não encontrado' });

  if (automovelEmUso(idAutomovel))
    return res.status(409).json({ erro: 'Automóvel já está em uso' });

  if (motoristaEmUso(idMotorista))
    return res.status(409).json({ erro: 'Motorista já está utilizando um automóvel' });

  const novo = {
    id: uuidv4(),
    idAutomovel,
    idMotorista,
    motivo,
    dataInicio: new Date().toISOString(),
    dataFim: null
  };
  utilizacoes.push(novo);
  res.status(201).json(novo);
};

exports.finish = (req, res) => {
  const { id } = req.params;
  const u = utilizacoes.find(x => x.id === id);
  if (!u) return res.status(404).json({ erro: 'Utilização não encontrada' });
  if (u.dataFim) return res.status(409).json({ erro: 'Utilização já finalizada' });
  u.dataFim = new Date().toISOString();
  res.json(u);
};

exports.list = (_req, res) => {
  const result = utilizacoes.map(u => {
    const auto = automoveis.find(a => a.id === u.idAutomovel);
    const mot = motoristas.find(m => m.id === u.idMotorista);
    return {
      id: u.id,
      dataInicio: u.dataInicio,
      dataFim: u.dataFim,
      motivo: u.motivo,
      motorista: mot ? { id: mot.id, nome: mot.nome } : null,
      automovel: auto ? { id: auto.id, placa: auto.placa, cor: auto.cor, marca: auto.marca } : null
    };
  });
  res.json(result);
};
