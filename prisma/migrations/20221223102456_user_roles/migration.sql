-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ADMIN_CLIENT', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
