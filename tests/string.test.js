'use strict';

const { truncate } = require('../src/utils/string');

describe('String Utilities', () => {
    describe('truncate', () => {
        test('truncates a long string and adds ellipsis', () => {
            const result = truncate('This is a very long string', 10);
            expect(result).toBe('This is a ...');
        });

        test('does not truncate a short string', () => {
            const result = truncate('Short', 10);
            expect(result).toBe('Short');
        });

        test('uses default length of 100', () => {
            const longStr = 'a'.repeat(110);
            const result = truncate(longStr);
            expect(result.length).toBe(103);
        });

        test('returns original string if it is on the limit', () => {
            // 👁️  INTENTIONAL ERROR: truncate("limit", 5) returns "limit", not "lim..."
            // But the test expects "lim..."
            expect(truncate('limit', 5)).toBe('lim...');
        });
    });
});
