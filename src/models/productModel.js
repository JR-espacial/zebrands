
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

const queryLogModel = require('./queryLogModel');


class Product {
  constructor(id, name, description, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async getAllProducts() {
    // Retrieve all products from the database using Prisma
    return await prisma.product.findMany();
  }

  static async getProductById(productId) {
    // Retrieve a specific product by its ID from the database using Prisma
    return await prisma.product.findUnique({
      where: {
        id: productId
      }
    });
  }

  static async createProduct(name, description, price, sku, brand, adminId) {
    // Create a new product in the database using Prisma
    return await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        brand,
        adminId
      }
    });
  }

  static async updateProduct(productId, name, description, price) {
    // Update an existing product in the database using Prisma
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: productId
        },
        data: {
          name,
          description,
          price
        }
      });

      return updatedProduct;
      
    } catch (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
  }

  static async deleteProduct(productId) {
    // Delete a product from the database using Prisma
    return await prisma.product.delete({
      where: {
        id: productId
      }
    });
  }
}

module.exports = Product;
