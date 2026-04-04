'use strict';

/**
 * Truncate a string to a specified length and add an ellipsis.
 * @param {string} str
 * @param {number} length
 * @returns {string}
 */
const truncate = (str, length = 100) => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
};

module.exports = { truncate };
