/*
  Warnings:

  - Added the required column `pyqyear` to the `Pyq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pyq" ADD COLUMN     "pyqyear" TEXT NOT NULL;
