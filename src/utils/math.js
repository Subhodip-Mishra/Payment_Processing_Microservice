'use strict';

/**
 * Safely format a numeric value to a fixed number of decimal places for currency.
 * @param {number} value
 * @returns {number}
 */
const formatCurrency = (value) => {
    return parseFloat(value.toFixed(2));
};

module.exports = { formatCurrency };
