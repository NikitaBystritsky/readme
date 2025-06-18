/*
  Warnings:

  - You are about to drop the column `tag_id` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `quotes` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `texts` table. All the data in the column will be lost.
  - You are about to drop the column `tag_id` on the `videos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "texts" DROP CONSTRAINT "texts_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_tag_id_fkey";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tag_id" CHAR(36),
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "texts" DROP COLUMN "tag_id";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "tag_id";

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
