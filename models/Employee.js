const db = require('../config/database');

class Employee {
  static async findAll(search = '') {
    let sql = `SELECT * FROM employees`;
    let params = [];

    if (search) {
      sql += ` WHERE name LIKE ? OR email LIKE ? OR position LIKE ?`;
      params = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    sql += ` ORDER BY created_at DESC`;
    
    return await db.allAsync(sql, params);
  }

  static async findById(id) {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    return await db.getAsync(sql, [id]);
  }

  static async create(employeeData) {
    const { name, email, position } = employeeData;
    const sql = `INSERT INTO employees (name, email, position) VALUES (?, ?, ?)`;
    const result = await db.runAsync(sql, [name, email, position]);
    return { id: result.id, name, email, position };
  }

  static async update(id, employeeData) {
    const { name, email, position } = employeeData;
    const sql = `UPDATE employees SET name = ?, email = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await db.runAsync(sql, [name, email, position, id]);
    return { id, name, email, position };
  }

  static async delete(id) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    await db.runAsync(sql, [id]);
    return true;
  }

  static async findByEmail(email) {
    const sql = `SELECT * FROM employees WHERE email = ?`;
    return await db.getAsync(sql, [email]);
  }
}

module.exports = Employee;