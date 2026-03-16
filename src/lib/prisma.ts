import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const isProduction = process.env.NODE_ENV === 'production'

// Helper to resolve SQLite path to absolute path
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  if (url?.startsWith('file:./')) {
    const relativePath = url.replace('file:./', '')
    return `file:${path.resolve(process.cwd(), relativePath)}`
  }
  return url
}

const dbUrl = getDatabaseUrl()

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: isProduction ? ['error'] : ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  })

// Add diagnostic logging to help identify why Prisma fails in production
if (isProduction) {
  prisma.$connect()
    .then(() => console.log('Prisma successfully connected to database'))
    .catch((err) => console.error('Prisma connection error:', err))
} else {
  console.log('Prisma initialized with resolved URL:', dbUrl)
  globalForPrisma.prisma = prisma
}
