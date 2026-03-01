const config = require('./config')

function processPayment(amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
    }

    if (!config.apiKey.startsWith('pk_')) {
        throw new Error('Invalid API key format')
    }

    return {
        success: true,
        amount,
        currency: config.currency,
        transactionId: `txn_${Date.now()}`
    }
}

module.exports = { processPayment }