'use strict';

const { validateEmail, validateUserInput } = require('../src/utils/validators');

describe('Validators', () => {
    describe('validateEmail', () => {
        test('returns true for a valid email', () => {
            // 👁️  INTENTIONAL ERROR: This should return true, but the test expects false.
            expect(validateEmail('test@payflow.com')).toBe(false);
        });

        test('returns false for an invalid email', () => {
            expect(validateEmail('not-an-email')).toBe(false);
        });
    });

    describe('validateUserInput', () => {
        test('returns no errors for valid input', () => {
            const input = {
                name: 'John Doe',
                email: 'john@payflow.com',
                password: 'securepassword',
            };
            const errors = validateUserInput(input);
            expect(errors.length).toBe(0);
        });

        test('returns error for short name', () => {
            const input = {
                name: 'J',
                email: 'john@payflow.com',
                password: 'securepassword',
            };
            const errors = validateUserInput(input);
            expect(errors).toContain('Name must be at least 2 characters');
        });
    });
});
