/*
  Warnings:

  - Added the required column `branchimage` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayimage` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branchimage" TEXT NOT NULL,
ADD COLUMN     "displayimage" TEXT NOT NULL;
