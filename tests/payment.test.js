const { processPayment } = require('../src/payment')

test('processes valid payment', () => {
    const result = processPayment(100)
    expect(result.success).toBe(true)
    expect(result.amount).toBe(100)
})

test('throws error for invalid amount', () => {
    expect(() => processPayment(-1))
        .toThrow('Amount must be greater than 0')
})