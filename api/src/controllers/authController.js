import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  console.log('Register called with:', req.body);
  try {
    const { email, password, name } = req.body;
    
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    console.log('Existing user:', existingUser);
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    console.log('Creating user...');
    const user = await User.create({ email, password, name });
    console.log('User created:', user);
    res.status(201).json({ id: user._id, email: user.email }); // No devolvemos password
  } catch (error) {
    console.error('Error in register:', error);
    if (error.name === 'ValidationError') {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = { message: error.errors[field].message };
      }
      return res.status(400).json({ errors });
    }
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Faltan datos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Credenciales inválidas" });

    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message: "Usuario no encontrado"});
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}