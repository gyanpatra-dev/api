/*
  Warnings:

  - You are about to drop the column `semesterId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `Semester` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `branchname` on the `Branch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `yearId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Semester" DROP CONSTRAINT "Semester_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_semesterId_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "branchname",
ADD COLUMN     "branchname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "semesterId",
ADD COLUMN     "yearId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Semester";

-- DropEnum
DROP TYPE "BranchName";

-- CreateTable
CREATE TABLE "Year" (
    "year_id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("year_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchname_key" ON "Branch"("branchname");

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("year_id") ON DELETE CASCADE ON UPDATE CASCADE;
