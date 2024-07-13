import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

async function main() {
  // Create admin users
  const admin1 = await prisma.admin.create({
    data: {
      email: 'admin1@example.com',
      password: 'securepassword', // Remember to hash passwords in a real application
      name: 'Admin One',
    },
  });

  const admin2 = await prisma.admin.create({
    data: {
      email: 'admin2@example.com',
      password: 'securepassword', // Remember to hash passwords in a real application
      name: 'Admin Two',
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
