-- CreateEnum
CREATE TYPE "Type" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('published', 'draft');

-- CreateTable
CREATE TABLE "publications" (
    "publication_id" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repost" BOOLEAN NOT NULL DEFAULT false,
    "user_id" CHAR(24) NOT NULL,
    "original_user_id" CHAR(24),
    "original_publication_id" CHAR(36),
    "link_id" CHAR(36),
    "photo_id" CHAR(36),
    "quote_id" CHAR(36),
    "text_id" CHAR(36),
    "teg_id" CHAR(36),

    CONSTRAINT "publications_pkey" PRIMARY KEY ("publication_id")
);

-- CreateTable
CREATE TABLE "links" (
    "link_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "teg_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("link_id")
);

-- CreateTable
CREATE TABLE "photos" (
    "photo_id" TEXT NOT NULL,
    "image" VARCHAR(125) NOT NULL,
    "teg_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "quote_id" TEXT NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "teg_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("quote_id")
);

-- CreateTable
CREATE TABLE "texts" (
    "text_id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "preview" VARCHAR(255) NOT NULL,
    "content" VARCHAR(1024) NOT NULL,
    "teg_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("text_id")
);

-- CreateTable
CREATE TABLE "videos" (
    "video_id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,
    "teg_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("video_id")
);

-- CreateTable
CREATE TABLE "tegs" (
    "teg_id" TEXT NOT NULL,
    "teg" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tegs_pkey" PRIMARY KEY ("teg_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publications_link_id_key" ON "publications"("link_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_photo_id_key" ON "publications"("photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_quote_id_key" ON "publications"("quote_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_text_id_key" ON "publications"("text_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_teg_id_key" ON "publications"("teg_id");

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("link_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos"("photo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quotes"("quote_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("text_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "videos"("video_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "tegs"("teg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "tegs"("teg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "tegs"("teg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "texts" ADD CONSTRAINT "texts_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "tegs"("teg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_teg_id_fkey" FOREIGN KEY ("teg_id") REFERENCES "tegs"("teg_id") ON DELETE CASCADE ON UPDATE CASCADE;
