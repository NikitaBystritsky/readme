/*
  Warnings:

  - The `status` column on the `publications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'published';

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Type";
