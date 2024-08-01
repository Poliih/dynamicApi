"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function viewData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Definindo o intervalo de datas para o filtro
            const startDate = new Date('2023-01-01'); // Substitua com a data de início desejada
            const endDate = new Date('2023-02-31'); // Substitua com a data de fim desejada
            // Buscando dados da tabela `unidades_consumidoras`
            const data = yield prisma.unidades_consumidoras.findMany({
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
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
viewData();
