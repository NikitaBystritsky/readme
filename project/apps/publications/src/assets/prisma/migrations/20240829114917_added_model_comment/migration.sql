-- CreateTable
CREATE TABLE "comments" (
    "comment_id" TEXT NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publication_id" CHAR(36) NOT NULL,
    "user_id" CHAR(24) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("publication_id") ON DELETE RESTRICT ON UPDATE CASCADE;
