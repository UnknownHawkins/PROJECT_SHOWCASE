type PrismaClientLike = Record<string, unknown>;

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClientLike;
};

async function loadPrismaClient() {
  const dynamicImport = new Function("specifier", "return import(specifier)") as (
    specifier: string
  ) => Promise<{ PrismaClient: new () => PrismaClientLike }>;

  return dynamicImport("@prisma/client");
}

export async function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalForPrisma.prisma) {
    const { PrismaClient } = await loadPrismaClient();
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}
