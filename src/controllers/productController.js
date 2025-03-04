const productModel = require('../models/productModel');
const mailerService = require('../services/mailService');
const queryLogModel = require('../models/queryLogModel');


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
    return res.status(400).send({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  try {
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).send({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }
    
    //check request headers for authentication
    const isAuthenticated = req.authenticated;
    if(!isAuthenticated) {
      const results = await queryLogModel.createQueryLog(productId);

      if (results.error) {
        return res.status(400).send({
          status: 'error',
          data: null,
          message: 'Error: ' + results.error
        });
      }
    }

    res.status(200).send({
      status: 'success',
      data: product,
      message: 'Product retrieved successfully.'
    });
  } catch (error) {
    res.status(400).send({
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
    const { name, description, price, sku, brand } = req.body;

    // Validate the request body to ensure all fields are present
    if (!name || !description || !price || !sku || !brand) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Missing required fields: name, description, price, sku, brand'
      });
    }

    // Call the model function to create the product
    const results = await productModel.createProduct(name, description, price, sku, brand);

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
    return res.status(400).send({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  const { name, description, price } = req.body;

  if (!name && !description && !price) {
    return res.status(400).send({
      status: 'error',
      data: null,
      message: 'Missing required fields: name, description, price'
    });
  }

  try {
    const updatedProduct = await productModel.updateProduct(productId, name, description, price);

    if (!updatedProduct) {
      return res.status(404).send({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }

    const mailSent = await mailerService.notifyAllAdmins({
      subject: 'Product Updated',
      text: `Product ${updatedProduct.name} has been updated.`,
      html: `<p>Product ${updatedProduct.name} has been updated.</p>`
    });

    if(!mailSent) {
      return res.status(500).send({
        status: 'error',
        data: null,
        message: 'Error sending emails.'
      });
    }


    res.status(200).send({
      status: 'success',
      data: updatedProduct,
      message: 'Product updated successfully.'
    });
  } catch (error) {
    res.status(400).send({
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
    return res.status(400).send({
      status: 'error',
      data: null,
      message: 'Invalid product ID.'
    });
  }

  try {
    const deletedProduct = await productModel.deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).send({
        status: 'error',
        data: null,
        message: 'Product not found.'
      });
    }
    res.status(200).send({
      status: 'success',
      data: deletedProduct,
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    res.status(400).send({
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
