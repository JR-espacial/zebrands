const productModel = require('../models/productModel');
const mailerService = require('../services/mailService');

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

// Fetch a single product
async function getProduct(req, res) {
  const productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  try {
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      data: product,
      message: 'Product retrieved successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      data: null,
      message: 'Error retrieving product: ' + error.message
    });
  }
}

//Create a new product
async function createProduct(req, res) {
  try {

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

    const mailSent = await mailerService.sendMessage({
      to: 'j__r__g@hotmail.com',
      subject: 'Product Updated',
      text: `Product ${updatedProduct.name} has been updated.`,
      html: `<strong>Product ${updatedProduct.name} has been updated.</strong>`
    });

    if(!mailSent) {
      return res.status(500).json({
        status: 'error',
        data: null,
        message: 'Error sending email.'
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

//Delete a product
async function deleteProduct(req, res) {
  const productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  try {
    const deletedProduct = await productModel.deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }
    res.status(200).json({
      status: 'success',
      data: deletedProduct,
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      data: null,
      message: 'Error deleting product: ' + error.message
    });
  }
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
