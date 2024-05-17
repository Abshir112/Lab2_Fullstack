// backend/controllers/employeeController.js
import Employee from '../models/Employee.js';

// Create Employee
export const createEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All Employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
