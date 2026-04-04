'use strict';

const { registerUser, loginUser, getAllUsers } = require('./user.service');
const { generateToken } = require('../auth/jwt.service');

const register = async (req, res) => {
  try {
    // BUG: Logging sensitive PII/Secrets (password) to console!
    console.log('[DEBUG] Processing registration request:', req.body);

    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });
    const token = generateToken({ id: user.id, email: user.email });
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    const token = generateToken({ id: user.id, email: user.email });
    return res.status(200).json({ success: true, user, token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, listUsers };
