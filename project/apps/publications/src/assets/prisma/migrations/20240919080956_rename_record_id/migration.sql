/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment_id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `like_id` on the `likes` table. All the data in the column will be lost.
  - The primary key for the `links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link_id` on the `links` table. All the data in the column will be lost.
  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `photo_id` on the `photos` table. All the data in the column will be lost.
  - The primary key for the `publications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publication_id` on the `publications` table. All the data in the column will be lost.
  - The primary key for the `quotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quote_id` on the `quotes` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag_id` on the `tags` table. All the data in the column will be lost.
  - The primary key for the `texts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `text_id` on the `texts` table. All the data in the column will be lost.
  - The primary key for the `videos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `video_id` on the `videos` table. All the data in the column will be lost.
  - The required column `id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `links` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `photos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `publications` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `quotes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `tags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `texts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `videos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_link_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_photo_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_quote_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_text_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_video_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "comment_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "like_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "links" DROP CONSTRAINT "links_pkey",
DROP COLUMN "link_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
DROP COLUMN "photo_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "publications" DROP CONSTRAINT "publications_pkey",
DROP COLUMN "publication_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "publications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_pkey",
DROP COLUMN "quote_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "quotes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "tag_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "texts" DROP CONSTRAINT "texts_pkey",
DROP COLUMN "text_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "texts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "videos" DROP CONSTRAINT "videos_pkey",
DROP COLUMN "video_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
