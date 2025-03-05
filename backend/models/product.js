const db = require('../config/database');

class Product {
  // Ensure this is a static method
  static clog() {
    console.log('inside class');
  }

  static async getAllProducts() {
    const query = 'SELECT * FROM usuarios;';
    try {
      const { rows } = await db.query(query, []);
      //console.log('in product')
      //console.log(rows)
      return rows;
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw error;
    }
  }

  static async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    try {
      const { rows } = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }
}

module.exports = Product;