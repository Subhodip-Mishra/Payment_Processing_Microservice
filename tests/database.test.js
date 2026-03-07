'use strict';

const {
  getUsers,
  createUser,
  getUserByEmail,
  getUserById,
  savePayment,
  getPayments,
  clearDatabase,
} = require('../src/database/connection');

beforeEach(() => {
  clearDatabase();
});

describe('Database — Users', () => {
  test('returns an empty array when no users exist', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(0);
  });

  test('creates a user and retrieves it by id', async () => {
    const created = await createUser({ name: 'Bob', email: 'bob@test.com', password: 'hashed' });
    expect(created.id).toBeDefined();

    const found = await getUserById(created.id);
    expect(found.name).toBe('Bob');
  });

  test('retrieves a user by email', async () => {
    await createUser({ name: 'Carol', email: 'carol@test.com', password: 'hashed' });
    const found = await getUserByEmail('carol@test.com');
    expect(found).not.toBeNull();
    expect(found.email).toBe('carol@test.com');
  });

  test('returns null for unknown email', async () => {
    const found = await getUserByEmail('nobody@test.com');
    expect(found).toBeNull();
  });

  test('ids are auto-incremented and unique', async () => {
    const u1 = await createUser({ name: 'U1', email: 'u1@test.com', password: 'h' });
    const u2 = await createUser({ name: 'U2', email: 'u2@test.com', password: 'h' });
    expect(u1.id).not.toBe(u2.id);
  });
});

describe('Database — Payments', () => {
  test('saves a payment and retrieves it', async () => {
    const payment = await savePayment({ userId: 1, amount: 100, fee: 3.20, status: 'completed' });
    expect(payment.id).toBeDefined();

    const all = await getPayments();
    expect(all.length).toBe(1);
    expect(all[0].amount).toBe(100);
  });

  test('clearDatabase resets everything', async () => {
    await createUser({ name: 'Temp', email: 'temp@test.com', password: 'h' });
    await savePayment({ userId: 1, amount: 50 });
    clearDatabase();

    const users = await getUsers();
    const payments = await getPayments();
    expect(users.length).toBe(0);
    expect(payments.length).toBe(0);
  });
});