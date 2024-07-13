const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to create a new product
router.post('/', productController.createProduct);

module.exports = router;
