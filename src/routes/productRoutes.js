const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requiresAuth } = require('express-openid-connect');

// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to fetch a single product
router.get('/:id', productController.getProduct);

// Route to create a new product
router.post('/',requiresAuth(), productController.createProduct);

// Route to update an existing product
router.put('/:id',requiresAuth(), productController.updateProduct);

// Route to delete a product
router.delete('/:id',requiresAuth(), productController.deleteProduct);

module.exports = router;
