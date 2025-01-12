/*
  Warnings:

  - Added the required column `pyqname` to the `Pyq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pyq" ADD COLUMN     "pyqname" TEXT NOT NULL;
