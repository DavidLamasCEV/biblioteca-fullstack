import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors()); // ¡CRUCIAL! Permite que el Front (puerto 5173) hable con el Back (3000)
app.use(express.json());

// RUTAS
app.use('/api/users', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/libraries', libraryRoutes);

// CONEXIÓN MONGO
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/biblioteca')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error Mongo:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});