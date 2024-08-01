import { Request, Response } from 'express';
import prisma from '../prisma';
import { UnidadesConsumidoras } from '../types';

export const getData = async (req: Request, res: Response) => {
    const { chartType } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }

    if (!['pie', 'line'].includes(chartType)) {
        return res.status(400).json({ error: 'Invalid chart type' });
    }

    try {
        const data: UnidadesConsumidoras[] = await prisma.unidades_consumidoras.findMany({
            where: {
                mes_referencia: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string),
                }
            },
            orderBy: { mes_referencia: 'asc' }
        });

        const formattedData = data.map((record) => ({
            date: record.mes_referencia.toISOString().split('T')[0],
            consumo: record.consumo,
            injetado: record.injetado,
            saldo: record.saldo,
            valor_total: record.valor_total,
            valor_economizado: record.valor_economizado
        }));

        return res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
