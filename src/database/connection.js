'use strict';

// In-memory database — simulates a real DB for testing without external deps
const db = {
  users: [],
  payments: [],
  _nextId: 1,
};

const _nextId = () => db._nextId++;

// ── Users ──────────────────────────────────────────────────────────────────

const getUsers = async () => [...db.users];

const getUserById = async (id) =>
  db.users.find((u) => u.id === id) || null;

const getUserByEmail = async (email) =>
  db.users.find((u) => u.email === email) || null;

const createUser = async (userData) => {
  const user = {
    id: _nextId(),
    ...userData,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  return { ...user };
};

// ── Payments ───────────────────────────────────────────────────────────────

const getPayments = async () => [...db.payments];

const getPaymentsByUser = async (userId) =>
  db.payments.filter((p) => p.userId === userId);

const savePayment = async (paymentData) => {
  const payment = {
    id: _nextId(),
    ...paymentData,
    createdAt: new Date().toISOString(),
  };
  db.payments.push(payment);
  return { ...payment };
};

// ── Helpers ────────────────────────────────────────────────────────────────

const clearDatabase = () => {
  db.users = [];
  db.payments = [];
  db._nextId = 1;
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  getPayments,
  getPaymentsByUser,
  savePayment,
  clearDatabase,
};
