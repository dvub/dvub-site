import { PrismaClient } from '@prisma/client';

// so.... i copied this from a vercel guide on fullstack apps with prisma
// i cant tell if im just too stupid to understand this,,
// or if its just genuinely shit code

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;