import Library from '../models/Library.js'; // Asegúrate que el nombre del archivo coincida

export const createLibrary = async (req, res) => {
  try {
    // req.body contiene lo que envía el formulario (name, location, etc)
    const newLibrary = await Library.create(req.body);
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// De paso, añadimos la función para verlas (te hará falta pronto)
export const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};