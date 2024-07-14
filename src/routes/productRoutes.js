const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to fetch a single product
router.get('/:id', productController.getProduct);

// Route to create a new product
router.post('/',authMiddleware, productController.createProduct);

// Route to update an existing product
router.put('/:id',authMiddleware, productController.updateProduct);

// Route to delete a product
router.delete('/:id',authMiddleware, productController.deleteProduct);

module.exports = router;
