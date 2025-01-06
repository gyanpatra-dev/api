/*
  Warnings:

  - Added the required column `yearname` to the `Year` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Year" ADD COLUMN     "yearname" TEXT NOT NULL;
