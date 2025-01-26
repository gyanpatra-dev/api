-- CreateTable
CREATE TABLE "YoutubeLinks" (
    "video_id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "videoname" TEXT NOT NULL,

    CONSTRAINT "YoutubeLinks_pkey" PRIMARY KEY ("video_id")
);

-- AddForeignKey
ALTER TABLE "YoutubeLinks" ADD CONSTRAINT "YoutubeLinks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
