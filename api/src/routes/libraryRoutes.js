import { Router } from 'express';
import { createLibrary, getLibraries } from '../controllers/libraryController.js';

const router = Router();

router.post('/', createLibrary); // POST para crear
router.get('/', getLibraries);   // GET para ver todas

export default router;