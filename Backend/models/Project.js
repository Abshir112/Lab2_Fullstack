// backend/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true },
  project_name: String,
  project_description: String,
});

export default mongoose.model('Project', projectSchema, 'projects');
