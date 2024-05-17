// backend/routes/employeeRoutes.js
import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/employeeController.js';
const router = express.Router();

router.post('/', createEmployee);
router.get('/', getAllEmployees);

export default router;
