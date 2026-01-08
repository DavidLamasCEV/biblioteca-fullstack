import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es requerido"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    minLength: [8, "Al menos 8 caracteres"],
  },
  name: String
});

// Encriptar contraseña antes de guardar
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);