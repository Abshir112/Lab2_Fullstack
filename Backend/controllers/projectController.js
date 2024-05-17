// backend/controllers/projectController.js
import Project from '../models/Project.js';

// Create Project
export const createProject = async (req, res) => {
  const newProject = new Project(req.body);
  try {
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
