import request from 'supertest';
import app from '../server'; // Certifique-se de que este caminho está correto

describe('GET /api/data/:chartType', () => {
    it('should return 400 if startDate or endDate is missing', async () => {
        const res = await request(app).get('/api/data/pie');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Start date and end date are required' });
    });

    it('should return 400 for invalid chart type', async () => {
        const res = await request(app).get('/api/data/unknown')
            .query({ startDate: '2023-01-01', endDate: '2023-06-01' });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid chart type' });
    });

    it('should return formatted data for pie chart', async () => {
        const res = await request(app).get('/api/data/pie')
            .query({ startDate: '2023-01-01', endDate: '2023-06-01' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                date: expect.any(String),
                consumo: expect.any(Number),
                injetado: expect.any(Number),
                saldo: expect.any(Number),
                valor_total: expect.any(Number),
                valor_economizado: expect.any(Number)
            }),
        ]));
    });

    it('should return formatted data for line chart', async () => {
        const res = await request(app).get('/api/data/line')
            .query({ startDate: '2023-01-01', endDate: '2023-06-01' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                date: expect.any(String),
                consumo: expect.any(Number),
                injetado: expect.any(Number),
                saldo: expect.any(Number),
                valor_total: expect.any(Number),
                valor_economizado: expect.any(Number)
            }),
        ]));
    });
});
