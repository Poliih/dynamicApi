# Dynamic API

Esta API RESTful dinâmica permite consultar dados para diferentes tipos de gráficos. Desenvolvida com Node.js, TypeScript, Prisma e MySQL, a API pode ser utilizada para gerar gráficos de pizza e linhas com dados filtrados por data.

## Endpoints

### `GET /api/data/:chartType`

Retorna dados formatados para o tipo de gráfico solicitado.

- **Parâmetros de URL:**
  - `chartType`: Tipo de gráfico a ser solicitado (`pie`, `line`).

- **Parâmetros de Query:**
  - `startDate`: Data de início para o filtro de dados, no formato `YYYY-MM-DD`.
  - `endDate`: Data de término para o filtro de dados, no formato `YYYY-MM-DD`.

- **Respostas:**
  - **200 OK**: Dados formatados conforme o tipo de gráfico solicitado.
    ```json
    [
      {
        "date": "2023-01-01",
        "consumo": 100.0,
        "injetado": 50.0,
        "saldo": 20.0,
        "valor_total": 500.0,
        "valor_economizado": 50.0
      }
    ]
    ```
  - **400 Bad Request**: Quando `startDate` ou `endDate` estão ausentes ou `chartType` é inválido.
    ```json
    {
      "error": "Start date and end date are required"
    }
    ```
    ```json
    {
      "error": "Invalid chart type"
    }
    ```
  - **500 Internal Server Error**: Se ocorrer um erro interno no servidor.
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

## Requisitos

- **Node.js**: Versão 16 ou superior.
- **MySQL**: Banco de dados MySQL.
- **Prisma**: ORM para interagir com o banco de dados.
- **Supertest**: Para testes de integração.
- **Jest**: Framework de testes.

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Poliih/dynamicApi.git
   cd dynamicApi
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione a URL de conexão com o banco de dados MySQL:
   ```env
   DATABASE_URL="mysql://newuser:newpassword@localhost:3306/dynamicapi"
   ```

4. **Execute as migrações do Prisma:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Inicie o servidor:**
   ```bash
   npm start
   ```

## Testes

Para executar os testes unitários e de integração, use:
```bash
npm test
```

Os testes garantem que a API lida corretamente com casos de erro e retorna dados formatados conforme o tipo de gráfico solicitado. Certifique-se de que o servidor esteja em execução antes de rodar os testes.

## Documentação do Código

O código está documentado com JSDoc. Para mais informações, consulte os arquivos de código.

## Exemplos de Uso

### Testes de Endpoint

**GET /api/data/pie**

```bash
curl "http://localhost:3000/api/data/pie?startDate=2023-01-01&endDate=2023-06-01"
```

**GET /api/data/line**

```bash
curl "http://localhost:3000/api/data/line?startDate=2023-01-01&endDate=2023-06-01"
```

## Contribuições

Se desejar contribuir com o projeto, faça um fork do repositório e envie um pull request com suas alterações. Agradecemos feedback e melhorias!

