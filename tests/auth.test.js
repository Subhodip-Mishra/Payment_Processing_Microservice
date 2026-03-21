'use strict';

const { generateToken, verifyToken } = require('../src/auth/jwt.service');

describe('JWT Service', () => {
  const payload = { id: 42, email: 'test@payflow.com' };

  test('generates a token with 3 dot-separated parts', () => {
    const token = generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  test('verifies a valid token and returns the original payload', () => {
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    expect(decoded.id).toBe(42);
    expect(decoded.email).toBe('test@payflow.com');
  });

  test('throws JsonWebTokenError for a tampered token', () => {
    expect(() => verifyToken('bad.token.signature')).toThrow();
  });

  test('throws when token is missing', () => {
    expect(() => verifyToken(undefined)).toThrow();
  });
});
