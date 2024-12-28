/*
  Warnings:

  - Added the required column `branchname` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectname` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "branchname" TEXT NOT NULL,
ADD COLUMN     "subjectname" TEXT NOT NULL;
