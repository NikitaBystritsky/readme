/*
  Warnings:

  - You are about to drop the column `teg_id` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `teg_id` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `teg_id` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `teg_id` on the `quotes` table. All the data in the column will be lost.
  - You are about to drop the column `teg_id` on the `texts` table. All the data in the column will be lost.
  - You are about to drop the column `teg_id` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the `tegs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[video_id]` on the table `publications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_teg_id_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_teg_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_teg_id_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_teg_id_fkey";

-- DropForeignKey
ALTER TABLE "texts" DROP CONSTRAINT "texts_teg_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_teg_id_fkey";

-- DropIndex
DROP INDEX "publications_teg_id_key";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "teg_id",
ADD COLUMN     "tag_id" CHAR(36);

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "teg_id",
ADD COLUMN     "tag_id" CHAR(36);

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "teg_id",
ADD COLUMN     "video_id" CHAR(36);

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "teg_id",
ADD COLUMN     "tag_id" CHAR(36);

-- AlterTable
ALTER TABLE "texts" DROP COLUMN "teg_id",
ADD COLUMN     "tag_id" CHAR(36);

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "teg_id",
ADD COLUMN     "tag_id" CHAR(36);

-- DropTable
DROP TABLE "tegs";

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" TEXT NOT NULL,
    "tag" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publications_video_id_key" ON "publications"("video_id");

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("video_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "texts" ADD CONSTRAINT "texts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
