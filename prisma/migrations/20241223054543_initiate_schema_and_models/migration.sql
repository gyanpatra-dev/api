-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "SavedPost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branch_id" SERIAL NOT NULL,
    "userid" INTEGER,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "semester_id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("semester_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" SERIAL NOT NULL,
    "semesterId" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "Pyq" (
    "pyq_id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Pyq_pkey" PRIMARY KEY ("pyq_id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "notes_id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("notes_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPost_userId_key" ON "SavedPost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_userid_key" ON "Branch"("userid");

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("semester_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pyq" ADD CONSTRAINT "Pyq_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
