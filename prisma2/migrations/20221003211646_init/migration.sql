-- CreateEnum
CREATE TYPE "Action" AS ENUM ('create', 'createMany', 'update', 'updateMAny', 'delete', 'deleteMany');

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "model" TEXT,
    "action" TEXT,
    "params" JSONB,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operation_params_key" ON "Operation"("params");
