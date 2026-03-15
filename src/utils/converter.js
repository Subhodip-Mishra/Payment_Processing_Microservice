'use strict';

/**
 * Simple currency converter (Mock).
 * @param {number} amount
 * @param {string} fromCurrency
 * @param {string} toCurrency
 * @returns {number}
 */
const convert = (amount, fromCurrency, toCurrency) => {
    // Basic mock rates
    const rates = { 'USD': 1, 'EUR': 0.92, 'GBP': 0.78 };
    const fromRate = rates[fromCurrency.toUpperCase()] || 1;
    const toRate = rates[toCurrency.toUpperCase()] || 1;

    return parseFloat((amount * (toRate / fromRate)).toFixed(2));
};

module.exports = { convert };
