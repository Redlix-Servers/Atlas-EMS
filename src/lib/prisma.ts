import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Use a fresh client if the environment suggests we just updated the schema
export const prisma = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient({ adapter });
  }

  // In development, we try to preserve the client but need it to be fresh
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter, log: ['query'] });
  }
  
  return globalForPrisma.prisma;
})();

// Helper to force a client refresh if models are missing
export const refreshPrisma = () => {
  globalForPrisma.prisma = new PrismaClient({ adapter, log: ['query'] });
  return globalForPrisma.prisma;
};
