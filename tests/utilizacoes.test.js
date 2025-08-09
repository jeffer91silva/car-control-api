const request = require('supertest');
const app = require('../src/app');

async function criarAutomovel(placa='XYZ1234') {
  const res = await request(app).post('/automoveis').send({ placa, cor: 'prata', marca: 'VW' });
  return res.body.id;
}
async function criarMotorista(nome='Ana') {
  const res = await request(app).post('/motoristas').send({ nome });
  return res.body.id;
}

describe('Utilizações', () => {
  it('regras de exclusividade e finalizar', async () => {
    const autoId = await criarAutomovel('XYZ0001');
    const m1 = await criarMotorista('Ana');
    const m2 = await criarMotorista('Beto');

    const u1 = await request(app).post('/utilizacoes').send({ idAutomovel: autoId, idMotorista: m1, motivo: 'Uso' }).expect(201);
    await request(app).post('/utilizacoes').send({ idAutomovel: autoId, idMotorista: m2, motivo: 'Outro' }).expect(409);

    await request(app).post(`/utilizacoes/${u1.body.id}/finalizar`).expect(200);
    await request(app).post('/utilizacoes').send({ idAutomovel: autoId, idMotorista: m2, motivo: 'Agora pode' }).expect(201);
  });
});
