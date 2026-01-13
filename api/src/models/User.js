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
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);