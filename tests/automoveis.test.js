const request = require('supertest');
const app = require('../src/app');

describe('Automóveis', () => {
  it('cria, lista e ordena', async () => {
    await request(app).post('/automoveis').send({ placa: 'BBB2222', cor: 'prata', marca: 'VW' }).expect(201);
    await request(app).post('/automoveis').send({ placa: 'AAA1111', cor: 'preto', marca: 'Fiat' }).expect(201);
    const asc = await request(app).get('/automoveis?sort=placa&order=asc').expect(200);
    expect(asc.body[0].placa).toBe('AAA1111');
  });
});
