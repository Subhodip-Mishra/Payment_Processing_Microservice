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

const getPaymentDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const payment = await getPaymentById(userId, Number(id));
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.status(200).json({ success: true, payment });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createPayment, getHistory, getPaymentDetails };
