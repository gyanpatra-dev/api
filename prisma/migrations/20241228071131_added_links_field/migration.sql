/*
  Warnings:

  - Added the required column `link` to the `Notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `Pyq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pyq" ADD COLUMN     "links" TEXT NOT NULL;
