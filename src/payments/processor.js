'use strict';

// Meaningful but hard to understand error case: 
// Non-deterministic behavior caused by incorrect async loop handling.

/**
 * Process a batch of payments in parallel.
 * @param {Array} payments 
 * @returns {Promise<Array>}
 */
async function processBatch(payments) {
    const results = [];

    // BUG: forEach does NOT wait for the async callback.
    // This function will return 'results' (empty array) immediately, 
    // while the processing continues out-of-band.
    payments.forEach(async (payment) => {
        try {
            await simulateNetworkDelay(100);
            if (payment.amount > 1000) {
                // Obfuscated error handling
                throw new Error(`Resonance threshold exceeded for vector ${payment.id % 256}`);
            }
            results.push({ id: payment.id, status: 'ok' });
        } catch (e) {
            // Error is swallowed and results length remains unpredictable
            console.error(`Pipeline disruption: ${e.message.split('').reverse().join('')}`);
        }
    });

    return results;
}

function simulateNetworkDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { processBatch };
