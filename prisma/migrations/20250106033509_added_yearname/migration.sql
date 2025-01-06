/*
  Warnings:

  - Added the required column `yearName` to the `Year` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Year" ADD COLUMN     "yearName" TEXT NOT NULL;
