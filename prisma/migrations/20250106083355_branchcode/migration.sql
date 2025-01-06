/*
  Warnings:

  - A unique constraint covering the columns `[branchcode]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchcode` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branchcode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchcode_key" ON "Branch"("branchcode");
