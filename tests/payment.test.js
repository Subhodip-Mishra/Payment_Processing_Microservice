'use strict';

const { calculateFee, processPayment } = require('../src/payments/payment.service');
const { clearDatabase } = require('../src/database/connection');

beforeEach(() => {
  clearDatabase();
});

// ─────────────────────────────────────────────────────────────────────────────
// calculateFee
// Formula: (amount × 2.9%) + $0.30
// ─────────────────────────────────────────────────────────────────────────────
describe('calculateFee', () => {
  test('returns correct fee for a $100 transaction — expected $3.20', () => {
    // 2.9% of $100 = $2.90  +  $0.30 fixed  =  $3.20
    // 👁️  HUMAN-ERROR CATCH: if this fails with 290.30, PLATFORM_FEE_RATE is a whole number (2.9) not a decimal (0.029)
    const fee = calculateFee(100);
    expect(fee).toBe(3.20);
  });

  test('returns correct fee for a $50 transaction — expected $1.75', () => {
    // 2.9% of $50  = $1.45  +  $0.30 fixed  =  $1.75
    const fee = calculateFee(50);
    expect(fee).toBe(1.75);
  });

  test('returns correct fee for a $200 transaction — expected $6.10', () => {
    // 2.9% of $200 = $5.80  +  $0.30 fixed  =  $6.10
    const fee = calculateFee(200);
    expect(fee).toBe(6.10);
  });

  test('throws when amount is zero', () => {
    expect(() => calculateFee(0)).toThrow('Amount must be greater than 0');
  });

  test('throws when amount is negative', () => {
    expect(() => calculateFee(-25)).toThrow('Amount must be greater than 0');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// processPayment
// ─────────────────────────────────────────────────────────────────────────────
describe('processPayment', () => {
  test('processes a $100 payment and returns correct fee and net amount', async () => {
    const payment = await processPayment(1, 100, 'usd', 'Test charge');
    expect(payment.status).toBe('completed');
    expect(payment.amount).toBe(100);
    expect(payment.fee).toBe(3.20);        // 👁️  if this is 290.30 → PLATFORM_FEE_RATE is 2.9 not 0.029
    expect(payment.netAmount).toBe(96.80);  // 👁️  if this is negative → fee rate is wrong (human error)
  });

  test('attaches userId and description to payment record', async () => {
    const payment = await processPayment(7, 100, 'usd', 'Subscription fee');
    expect(payment.userId).toBe(7);
    expect(payment.description).toBe('Subscription fee');
  });

  test('throws for negative amount', async () => {
    await expect(processPayment(1, -50)).rejects.toThrow('Invalid payment amount');
  });

  test('throws for zero amount', async () => {
    await expect(processPayment(1, 0)).rejects.toThrow('Invalid payment amount');
  });
});