import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  // Create admin users
  const admin1 = await prisma.admin.create({
    data: {
      email: 'jorge_alan_2001@hotmail.com',
      name: 'jorge_alan_2001@hotmail.com"',
      auth0Id: 'auth0|669062b5c7ae2e739059e185'
    },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        sku: 'P001',
        name: 'Product One',
        description: 'Description for Product One', // Add description
        price: 10.99,
        brand: 'Brand A',
        adminId: admin1.id,
      },
      {
        sku: 'P002',
        name: 'Product Two',
        description: 'Description for Product Two', // Add description
        price: 20.99,
        brand: 'Brand B',
        adminId: admin2.id,
      },
      {
        sku: 'P003',
        name: 'Product Three',
        description: 'Description for Product Three', // Add description
        price: 30.99,
        brand: 'Brand C',
        adminId: admin1.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
