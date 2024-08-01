import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function viewData() {
  try {
    const data = await prisma.unidadeConsumidora.findMany({
      where: {
        // Adicione filtros ou condições aqui se necessário
      },
      select: {
        UC: true,
        mes_referencia: true,
        consumo: true,
        injetado: true,
        saldo: true,
        valor_total: true,
        valor_economizado: true,
      },
    });

    console.log('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

viewData();
