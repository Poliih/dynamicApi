// src/index.ts
import prisma from './prismaClient';

async function main() {
  try {
    const data = await prisma.inmetCoGoA002Goiania.findMany();
    console.log(data);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
