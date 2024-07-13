const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class QueryLog {
  constructor(id, productId, queriedAt) {
    this.id = id;
    this.productId = productId;
    this.queriedAt = queriedAt;
  }

  static async getAllQueryLogs() {
    // Retrieve all query logs from the database using Prisma
    return await prisma.queryLog.findMany();
  }

  static async getQueryLogsByProductId(productId) {
    // Retrieve query logs for a specific product by its ID from the database using Prisma
    return await prisma.queryLog.findMany({
      where: {
        productId
      }
    });
  }

  static async createQueryLog(productId) {
    // Create a new query log in the database using Prisma
    return await prisma.queryLog.create({
      data: {
        productId
      }
    });
  }

  static async deleteQueryLog(queryLogId) {
    // Delete a query log from the database using Prisma
    return await prisma.queryLog.delete({
      where: {
        id: queryLogId
      }
    });
  }
}

module.exports = QueryLog;
