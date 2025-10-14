// Lazy import to avoid failing when @prisma/client isn't generated yet
// eslint-disable-next-line @typescript-eslint/no-var-requires
let PrismaPkg: any = null;
try {
  // This will throw until `npx prisma generate` has been run at least once
  // which creates node_modules/@prisma/client
  // We catch to allow the app to boot without DB during initial setup
  // and return a null prisma below.
  PrismaPkg = require('@prisma/client');
} catch (err) {
  PrismaPkg = null;
}
const PrismaClient = PrismaPkg?.PrismaClient ?? null;

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

const prisma = global.prisma || (PrismaClient ? new PrismaClient() : null);
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma;
}

export default prisma;


