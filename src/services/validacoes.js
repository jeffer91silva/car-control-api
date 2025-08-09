const utilizacoes = require('../database/utilizacoesDB');

exports.automovelEmUso = (idAutomovel) =>
  utilizacoes.some(u => u.idAutomovel === idAutomovel && !u.dataFim);

exports.motoristaEmUso = (idMotorista) =>
  utilizacoes.some(u => u.idMotorista === idMotorista && !u.dataFim);
