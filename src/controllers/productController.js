const productModel = require('../models/productModel');

// Fetch all products
async function getAllProducts(req, res) {
  try {
    // Call the model function to retrieve all products
    const results = await productModel.getAllProducts();

    // Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    // Send a successful response with the product data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Products retrieved successfully.'
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send({
      status: 'error',
      data: null,
      message: 'Error: ' + error.message
    });
  }
}

//Create a new product
async function createProduct(req, res) {
  try {
    // Log the request body for debugging purposes
    console.log(req.body);

    // Destructure the required fields from the request body
    const { name, description, price, sku, brand, adminId } = req.body;

    // Validate the request body to ensure all fields are present
    if (!name || !description || !price || !sku || !brand || !adminId) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Missing required fields: name, description, price, sku, brand, or adminId.'
      });
    }

    // Call the model function to create the product
    const results = await productModel.createProduct(name, description, price, sku, brand, adminId);

    // Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    // Send a successful response with the created product data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Product created successfully.'
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send({
      status: 'error',
      data: null,
      message: 'Error: ' + error.message
    });
  }
} 

async function updateProduct(req, res) {
  const productId = parseInt(req.params.id);

  console.log(req.params);
  
  if (!productId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  const { name, description, price } = req.body;

  try {
    const updatedProduct = await productModel.updateProduct(productId, name, description, price);
    if (!updatedProduct) {
      return res.status(404).json({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }
    res.status(200).json({
      status: 'success',
      data: updatedProduct,
      message: 'Product updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      data: null,
      message: 'Error updating product: ' + error.message
    });
  }
}



module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
};
