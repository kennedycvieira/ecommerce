// models/product.js
const db = require('../config/database');

class Product {
  static async getAllProducts() {
    const query = 'INSERT INTO  usuarios (id,nome, email) VALUES ($1,$2,$3);';
    const { rows } = await db.query(query,[3,'batatinha','batatinha@gmail.com']);
    return rows;
  }

  static async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}
