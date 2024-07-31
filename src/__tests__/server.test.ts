
import request from 'supertest';
import app from '../server'; // Ajuste o caminho conforme necessário

describe('GET /data/:chartType', () => {
  it('should return 400 if startDate or endDate is missing', async () => {
    const res = await request(app).get('/data/pie');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Start date and end date are required' });
  });

  it('should return formatted data for pie chart', async () => {
    const res = await request(app)
      .get('/data/pie')
      .query({ startDate: '2023-07-01', endDate: '2023-07-02' });

    console.log('Response from API:', res.body); // Log da resposta da API

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { date: '2023-07-01', precipitation: 5 },  // Ajuste conforme os dados reais
      { date: '2023-07-02', precipitation: 10 }, // Ajuste conforme os dados reais
    ]);
  });
});
