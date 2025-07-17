import express from 'express';
import { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } from '../controllers/employee.controller.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createEmployee);
router.get('/', authMiddleware, getAllEmployees);
router.put('/:id', authMiddleware, adminMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEmployee);

export default router;
