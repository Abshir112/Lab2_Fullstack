// frontend/src/components/ProjectAssignmentsTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';

const ProjectAssignmentsTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'start_date', direction: 'desc' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/project_assignments/latest');
      setAssignments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project assignments:', error);
      setLoading(false);
    }
  };

  const handleSort = (property) => {
    const isAsc = sortConfig.key === property && sortConfig.direction === 'asc';
    setSortConfig({ key: property, direction: isAsc ? 'desc' : 'asc' });
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
  };

  const sortedAssignments = () => {
    const sortableAssignments = [...assignments];
    sortableAssignments.sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableAssignments;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Latest Project Assignments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortConfig.key === 'employee_id' ? sortConfig.direction : false}>
                <TableSortLabel
                  active={sortConfig.key === 'employee_id'}
                  direction={sortConfig.key === 'employee_id' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('employee_id')}
                >
                  Employee ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortConfig.key === 'employee.full_name' ? sortConfig.direction : false}>
                <TableSortLabel
                  active={sortConfig.key === 'employee.full_name'}
                  direction={sortConfig.key === 'employee.full_name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('employee.full_name')}
                >
                  Employee Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortConfig.key === 'project.project_name' ? sortConfig.direction : false}>
                <TableSortLabel
                  active={sortConfig.key === 'project.project_name'}
                  direction={sortConfig.key === 'project.project_name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('project.project_name')}
                >
                  Project Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortConfig.key === 'start_date' ? sortConfig.direction : false}>
                <TableSortLabel
                  active={sortConfig.key === 'start_date'}
                  direction={sortConfig.key === 'start_date' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('start_date')}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAssignments().map((assignment) => (
              <TableRow key={assignment.employee_id + assignment.project_code}>
                <TableCell>{assignment.employee_id}</TableCell>
                <TableCell>{assignment.employee.full_name}</TableCell>
                <TableCell>{assignment.project.project_name}</TableCell>
                <TableCell>{new Date(assignment.start_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProjectAssignmentsTable;
