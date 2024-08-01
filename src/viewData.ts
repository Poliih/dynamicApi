import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function viewData() {
  try {
    // Definindo o intervalo de datas para o filtro
    const startDate = new Date('2023-01-01'); // Substitua com a data de início desejada
    const endDate = new Date('2023-02-31');   // Substitua com a data de fim desejada

    // Buscando dados da tabela `unidades_consumidoras`
    const data = await prisma.unidades_consumidoras.findMany({
      where: {
        mes_referencia: {
          gte: startDate,
          lte: endDate,
        },
        
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

    // Exibindo os dados obtidos
    console.log('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

viewData();
