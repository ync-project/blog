import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

// TypeScript is throwing a `ts7017` on the `global.prisma`:
//Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
declare global {
    var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma as PrismaClient