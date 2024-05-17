// backend/controllers/projectAssignmentController.js
import ProjectAssignment from '../models/ProjectAssignment.js';
import Employee from '../models/Employee.js';
import Project from '../models/Project.js';

// Create Project Assignment
export const createProjectAssignment = async (req, res) => {
  const newProjectAssignment = new ProjectAssignment(req.body);
  try {
    await newProjectAssignment.save();
    res.status(201).send(newProjectAssignment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All Project Assignments
export const getAllProjectAssignments = async (req, res) => {
  try {
    const projectAssignments = await ProjectAssignment.find();
    res.status(200).json(projectAssignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Latest 5 Project Assignments with Aggregation
export const getLatestProjectAssignments = async (req, res) => {
  try {
    const projectAssignments = await ProjectAssignment.aggregate([
      {
        $sort: { start_date: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee_id',
          foreignField: 'employee_id',
          as: 'employee'
        }
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'project_code',
          foreignField: 'project_code',
          as: 'project'
        }
      },
      {
        $unwind: '$employee'
      },
      {
        $unwind: '$project'
      },
      {
        $project: {
          employee_id: 1,
          project_code: 1,
          start_date: 1,
          'employee.full_name': 1,
          'project.project_name': 1
        }
      }
    ]);
    res.status(200).json(projectAssignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
