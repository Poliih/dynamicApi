# Dynamic API

## Endpoints

### GET /data/:chartType

Retorna os dados formatados para o tipo de gráfico solicitado.

#### Parâmetros
- `chartType`: Tipo de gráfico (por exemplo, `pie`, `line`).
- `startDate`: Data de início para filtrar os dados.
- `endDate`: Data de fim para filtrar os dados.

#### Respostas
- `200 OK`: Dados formatados para o gráfico solicitado.
- `400 Bad Request`: Falta de parâmetros obrigatórios.
- `500 Internal Server Error`: Erro no servidor.

### Como Executar

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Configure o banco de dados no arquivo `.env`.
4. Execute as migrações do Prisma: `npx prisma migrate dev`
5. Inicie o servidor: `npm run dev`

### Como Testar

Execute os testes: `npm test`
