import { PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaClient2 } from '@prisma/client2'

export const prisma = new PrismaClient()
export const prisma2 = new PrismaClient2()
