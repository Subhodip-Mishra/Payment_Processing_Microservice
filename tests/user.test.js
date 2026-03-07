'use strict';

const { registerUser, loginUser, getAllUsers } = require('../src/users/user.service');
const { clearDatabase } = require('../src/database/connection');

beforeEach(() => {
  clearDatabase();
});

describe('User Registration', () => {
  test('registers a new user and returns user without password', async () => {
    const user = await registerUser({
      name: 'Alice Smith',
      email: 'alice@payflow.com',
      password: 'secure123',
    });

    expect(user.email).toBe('alice@payflow.com');
    expect(user.name).toBe('Alice Smith');
    expect(user.id).toBeDefined();
    expect(user.password).toBeUndefined();
  });

  test('throws error when email is already registered', async () => {
    await registerUser({ name: 'Alice', email: 'alice@payflow.com', password: 'pass123' });

    await expect(
      registerUser({ name: 'Alice2', email: 'alice@payflow.com', password: 'pass456' })
    ).rejects.toThrow('Email already registered');
  });

  test('throws error for invalid email format', async () => {
    await expect(
      registerUser({ name: 'Bob', email: 'not-an-email', password: 'pass123' })
    ).rejects.toThrow();
  });

  test('throws error when password is too short', async () => {
    await expect(
      registerUser({ name: 'Bob', email: 'bob@payflow.com', password: '123' })
    ).rejects.toThrow();
  });
});

describe('User Login', () => {
  beforeEach(async () => {
    await registerUser({ name: 'Jane Doe', email: 'jane@payflow.com', password: 'mypassword' });
  });

  test('logs in successfully with correct credentials', async () => {
    const user = await loginUser({ email: 'jane@payflow.com', password: 'mypassword' });
    expect(user.email).toBe('jane@payflow.com');
    expect(user.password).toBeUndefined();
  });

  test('throws error for wrong password', async () => {
    await expect(
      loginUser({ email: 'jane@payflow.com', password: 'wrongpassword' })
    ).rejects.toThrow('Invalid email or password');
  });

  test('throws error for non-existent email', async () => {
    await expect(
      loginUser({ email: 'ghost@payflow.com', password: 'pass' })
    ).rejects.toThrow('Invalid email or password');
  });
});

describe('Get All Users', () => {
  test('returns all users without passwords', async () => {
    await registerUser({ name: 'User A', email: 'a@payflow.com', password: 'passA123' });
    await registerUser({ name: 'User B', email: 'b@payflow.com', password: 'passB123' });

    const users = await getAllUsers();
    expect(users.length).toBe(2);
    users.forEach((u) => expect(u.password).toBeUndefined());
  });
});
