// viewData.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function viewData() {
  try {
    const data = await prisma.inmetCoGoA002Goiania.findMany();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

viewData();
