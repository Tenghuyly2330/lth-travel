const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'travel_secret_key_123';

// Login User / Admin
const login = async (req, res) => {
      try {
            const { email, password } = req.body;

            if (!email || !password) {
                  return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await prisma.user.findUnique({
                  where: { email: email.toLowerCase().trim() },
            });

            if (!user) {
                  return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                  { id: user.id, email: user.email, role: user.role, name: user.name },
                  JWT_SECRET,
                  { expiresIn: '24h' }
            );

            res.json({
                  message: 'Login successful',
                  token,
                  user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                  },
            });
      } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error during login', error: error.message });
      }
};

// Get current user profile
const getMe = async (req, res) => {
      try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  return res.status(401).json({ message: 'Unauthorized, no token provided' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await prisma.user.findUnique({
                  where: { id: decoded.id },
                  select: { id: true, name: true, email: true, role: true, createdAt: true },
            });

            if (!user) {
                  return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
      } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token' });
      }
};

module.exports = {
      login,
      getMe,
};
