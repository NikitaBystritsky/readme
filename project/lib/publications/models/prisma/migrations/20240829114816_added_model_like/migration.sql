-- CreateTable
CREATE TABLE "likes" (
    "like_id" TEXT NOT NULL,
    "publication_id" CHAR(36) NOT NULL,
    "user_id" CHAR(24) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("publication_id") ON DELETE RESTRICT ON UPDATE CASCADE;
