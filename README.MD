# Dynamic API

Esta API RESTful dinâmica permite consultar dados para diferentes tipos de gráficos.

## Endpoints

### `GET /api/data/:chartType`

- **Parâmetros de URL:**
  - `chartType`: Tipo de gráfico (por exemplo, "pie", "line").
- **Parâmetros de Query:**
  - `startDate`: Data de início no formato `YYYY-MM-DD`.
  - `endDate`: Data de término no formato `YYYY-MM-DD`.

- **Respostas:**
  - **200 OK**: Dados formatados para o tipo de gráfico solicitado.
  - **400 Bad Request**: Se `startDate` ou `endDate` estiver faltando ou se o `chartType` for inválido.
  - **500 Internal Server Error**: Se ocorrer um erro no servidor.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url>
