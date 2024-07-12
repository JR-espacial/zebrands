const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllAdmins(req, res) {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'An error occurred while fetching admins.' });
  }
}

module.exports = {
  getAllAdmins,
};
