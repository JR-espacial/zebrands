/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_adminId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Admin";
