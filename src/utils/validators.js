'use strict';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUserInput = ({ name, email, password }) => {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!email || !validateEmail(email)) {
    errors.push('Invalid email address');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};

module.exports = { validateEmail, validateUserInput };
