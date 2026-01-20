const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  location: String,
  established: Number,
}, {
  timestamps: true // Esto añade automáticamente createdAt y updatedAt
});

module.exports = mongoose.model("Library", librarySchema);