const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Admin {
  constructor(id, email, password, name) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static async getAllAdmins() {
    // Retrieve all admins from the database using Prisma
    return await prisma.admin.findMany();
  }

  static async getAdminById(adminId) {
    // Retrieve a specific admin by their ID from the database using Prisma
    return await prisma.admin.findUnique({
      where: {
        id: adminId
      }
    });
  }

  static async createAdmin(email,name, auth0Id) {
    // Create a new admin in the database using Prisma
    return await prisma.admin.create({
      data: {
        email,
        name,
        auth0Id
      }
    });
  }

  static async updateAdmin(adminId, email, name, auth0Id) {
    // Update an existing admin in the database using Prisma
    return await prisma.admin.update({
      where: {
        id: adminId
      },
      data: {
        email,
        name,
        auth0Id
      }
    });
  }

  static async deleteAdmin(adminId) {
    // Delete an admin from the database using Prisma
    return await prisma.admin.delete({
      where: {
        id: adminId
      }
    });
  }
}

module.exports = Admin;
