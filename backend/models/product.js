// models/product.js
const db = require('../config/database');

class Product {
  static async getAllProducts() {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    return rows;
  }

  static async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

// controllers/productController.js
const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
};