import Library from '../models/Library.js'; // Asegúrate que el nombre del archivo coincida

export const createLibrary = async (req, res) => {
  try {
    const newLibrary = await Library.create(req.body);
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};