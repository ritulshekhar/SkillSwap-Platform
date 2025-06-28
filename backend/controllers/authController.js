// authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log('Register endpoint hit with:', req.body);
  const { name, email, password, teachSkills, learnSkills, timezone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    console.log('User exists:', userExists);

    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      teachSkills,
      learnSkills,
      timezone
    });
    console.log('User created:', user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('Token generated');

    console.log('Sending response with token:', token);
    res.status(201).json({ token });
  } catch (err) {
    console.error('❌ Register error:', err);  // ← this is key
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  console.log('Login endpoint hit with:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('❌ No user found');
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('❌ Invalid password');
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('✅ Token generated:', token);

    res.status(200).json({ token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: err.message });
  }
};

