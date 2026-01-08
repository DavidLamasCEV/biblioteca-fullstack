import { Router } from 'express';
import { getBooks, createBook, deleteBook, getBookById, updateBook } from '../controllers/bookController.js';

const router = Router();

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBookById); // Para el detalle
router.patch('/:id', updateBook); // Para editar
router.delete('/:id', deleteBook);

export default router;