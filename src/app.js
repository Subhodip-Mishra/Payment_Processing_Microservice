'use strict';

const express = require('express');
const { register, login, listUsers } = require('./users/user.controller');
const { createPayment, getHistory } = require('./payments/payment.controller');
const { authenticate } = require('./auth/middleware');
const { PORT } = require('./config');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'payflow-api',
    version: '1.2.0',
    timestamp: new Date().toISOString(),
  });
});


app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/users', authenticate, listUsers);

// ── Payments ───────────────────────────────────────────────────────────────

app.post('/api/payments', authenticate, createPayment);
app.get('/api/payments/history', authenticate, getHistory);

// ── Start ──────────────────────────────────────────────────────────────────

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`PayFlow API running on port ${PORT}`);
  });
}

module.exports = app;
