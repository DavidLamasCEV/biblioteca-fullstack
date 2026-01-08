import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; 
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Book", bookSchema);