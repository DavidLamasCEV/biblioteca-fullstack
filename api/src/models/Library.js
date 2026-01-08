import mongoose from 'mongoose';
const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  established: Number,
});
export default mongoose.model("Library", librarySchema);