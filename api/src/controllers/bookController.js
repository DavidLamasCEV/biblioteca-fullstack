import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    // .populate('user') traerá los datos del dueño del libro
    const books = await Book.find().populate("user", "email name");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("user", "email");
    if(!book) return res.status(404).json({message: "Libro no encontrado"});
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};