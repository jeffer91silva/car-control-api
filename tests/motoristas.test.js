const request = require('supertest');
const app = require('../src/app');

describe('Motoristas', () => {
  it('cria e ordena por nome', async () => {
    await request(app).post('/motoristas').send({ nome: 'Carlos' }).expect(201);
    await request(app).post('/motoristas').send({ nome: 'Ana' }).expect(201);
    const asc = await request(app).get('/motoristas?sort=nome&order=asc').expect(200);
    expect(asc.body[0].nome).toBe('Ana');
  });
});
