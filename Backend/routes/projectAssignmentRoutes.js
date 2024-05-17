// backend/routes/projectAssignmentRoutes.js
import express from 'express';
import { createProjectAssignment, getAllProjectAssignments, getLatestProjectAssignments } from '../controllers/projectAssignmentController.js';
const router = express.Router();

router.post('/', createProjectAssignment);
router.get('/', getAllProjectAssignments);
router.get('/latest', getLatestProjectAssignments);

export default router;
