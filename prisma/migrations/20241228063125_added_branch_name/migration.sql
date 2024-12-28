/*
  Warnings:

  - A unique constraint covering the columns `[branchname]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchname` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BranchName" AS ENUM ('IT', 'CSE', 'PE', 'CHE', 'MME', 'ETC', 'EE', 'EEE', 'AIML');

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branchname" "BranchName" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchname_key" ON "Branch"("branchname");
