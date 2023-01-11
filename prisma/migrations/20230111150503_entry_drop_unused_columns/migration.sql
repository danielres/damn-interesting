/*
  Warnings:

  - You are about to drop the column `height` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `providerName` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `resourceType` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailHeight` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailWidth` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Entry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "thumbnailUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "Entry_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("authorName", "authorUrl", "createdAt", "description", "duration", "id", "ownerId", "thumbnailUrl", "title", "url") SELECT "authorName", "authorUrl", "createdAt", "description", "duration", "id", "ownerId", "thumbnailUrl", "title", "url" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
