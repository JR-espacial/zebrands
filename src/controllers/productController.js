const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productModel = require('../models/productModel');

// Fetch all products
async function getAllProducts(req, res) {
  try {
    const products = await  productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
}

//Create a new product
async function createProduct(req, res) {
  try {
    const { name, description, price } = req.body;
    const product = await productModel.createProduct(name, description, price);
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating product.' });
  }
}

module.exports = {
  getAllProducts,
};
