const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update an existing product
router.post('/update/:id', productController.updateProduct);

module.exports = router;
