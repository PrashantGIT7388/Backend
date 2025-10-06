const Employee = require('../models/Employee');

const employeeController = {
  // Get all employees with optional search
  async getAllEmployees(req, res) {
    try {
      const { search } = req.query;
      const employees = await Employee.findAll(search);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single employee by ID
  async getEmployee(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new employee
  async createEmployee(req, res) {
    try {
      const { name, email, position } = req.body;

      // Validation
      if (!name || !email || !position) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if email already exists
      const existingEmployee = await Employee.findByEmail(email);
      if (existingEmployee) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const newEmployee = await Employee.create({ name, email, position });
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update employee
  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { name, email, position } = req.body;

      // Validation
      if (!name || !email || !position) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if employee exists
      const existingEmployee = await Employee.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Check if email is taken by another employee
      const emailOwner = await Employee.findByEmail(email);
      if (emailOwner && emailOwner.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const updatedEmployee = await Employee.update(id, { name, email, position });
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete employee
  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      // Check if employee exists
      const existingEmployee = await Employee.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      await Employee.delete(id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = employeeController;