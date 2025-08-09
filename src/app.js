const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger');

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', name: 'Car Control API', version: '1.1.0', uptime_seconds: process.uptime() });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const automoveisRoutes = require('./routes/automoveis');
const motoristasRoutes = require('./routes/motoristas');
const utilizacoesRoutes = require('./routes/utilizacoes');
const adminRoutes = require('./routes/admin');

app.use('/automoveis', automoveisRoutes);
app.use('/motoristas', motoristasRoutes);
app.use('/utilizacoes', utilizacoesRoutes);
app.use('/admin', adminRoutes);

app.get('/', (_req, res) => res.redirect('/docs'));

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));

module.exports = app;
