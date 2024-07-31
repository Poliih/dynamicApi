import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Tipagem das query parameters
interface QueryParams {
    startDate?: string;
    endDate?: string;
}

app.get('/data/:chartType', async (req, res) => {
    const { chartType } = req.params;
    const { startDate, endDate } = req.query as QueryParams; // Tipagem dos parâmetros da query

    try {
        let data;
        if (chartType === 'pie') {
            // Alternativa se o groupBy não estiver disponível
            const records = await prisma.inmetcogoa002goiania.findMany({
                where: {
                    Data: {
                        gte: startDate ? new Date(startDate) : undefined,
                        lte: endDate ? new Date(endDate) : undefined,
                    },
                },
                select: {
                    Data: true,
                    PRECIPITACAO_TOTAL_HORARIO_mm: true,
                },
            });

            // Agregação manual
            const aggregatedData = records.reduce((acc, record) => {
                const date = record.Data?.toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = { date, precipitation: 0 };
                }
                acc[date].precipitation += record.PRECIPITACAO_TOTAL_HORARIO_mm || 0;
                return acc;
            }, {} as Record<string, { date: string; precipitation: number }>);

            data = Object.values(aggregatedData);
        } else {
            // Lógica para outros tipos de gráficos
            data = [];
        }

        res.json(data);
    } catch (error) {
        console.error('Error in /data/:chartType endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

export default app;
