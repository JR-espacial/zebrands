const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all products
async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
}

module.exports = {
  getAllProducts,
};
