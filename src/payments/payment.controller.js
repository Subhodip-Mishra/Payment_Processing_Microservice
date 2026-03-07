'use strict';

const { processPayment, getPaymentHistory } = require('./payment.service');

const createPayment = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;
    const userId = req.user.id;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: 'amount is required' });
    }

    const payment = await processPayment(
      userId,
      Number(amount),
      currency || 'usd',
      description || ''
    );

    return res.status(201).json({ success: true, payment });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await getPaymentHistory(userId);
    return res.status(200).json({ success: true, payments });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createPayment, getHistory };
