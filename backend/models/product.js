// models/product.js
const db = require('../config/database');

class Product {
  static async getAllProducts() {
    const query = 'SELECT * FROM usuarios;';
    const { rows } = await db.query(query);
    return rows;
  }

  static async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}
