/*
  Warnings:

  - You are about to alter the column `id` on the `Schedule` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Consultancy` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Schedule" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "doctorId" STRING NOT NULL,
    "days" STRING NOT NULL,
    "timing" STRING NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Schedule" ("days","doctorId","id","timing") SELECT "days","doctorId","id","timing" FROM "Schedule";
DROP TABLE "Schedule" CASCADE;
ALTER TABLE "_prisma_new_Schedule" RENAME TO "Schedule";
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Consultancy" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctorId" STRING NOT NULL,
    "patientId" STRING NOT NULL,

    CONSTRAINT "Consultancy_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Consultancy" ("date","doctorId","id","patientId") SELECT "date","doctorId","id","patientId" FROM "Consultancy";
DROP TABLE "Consultancy" CASCADE;
ALTER TABLE "_prisma_new_Consultancy" RENAME TO "Consultancy";
ALTER TABLE "Consultancy" ADD CONSTRAINT "Consultancy_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Consultancy" ADD CONSTRAINT "Consultancy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
