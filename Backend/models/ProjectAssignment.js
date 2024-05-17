// backend/models/ProjectAssignment.js
import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: String,
  project_code: String,
  start_date: Date,
});

export default mongoose.model('ProjectAssignment', projectAssignmentSchema, 'project_assignments');
