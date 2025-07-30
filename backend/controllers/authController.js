// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log(req.body);

//   try {
//     // Check if user already exists with same email and role
//     const existingUser = await User.findOne({ email, role });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists with this email and role' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("completed1");
//     // Create and save the new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();
//     console.log("completed2");

//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (err) {
//     res.status(500).json({ error: 'Server error during signup' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await User.findOne({ email, role });
//     if (!user) {
//       console.log('Login failed: user not found with email and role', email, role);
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       console.log('Login failed: password mismatch for', email);
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.json({ token, user: { name: user.name, email: user.email, role: user.role } });

//   } catch (err) {
//     console.error('Server error during login:', err);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// };


// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email, role });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Signup error' });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
};