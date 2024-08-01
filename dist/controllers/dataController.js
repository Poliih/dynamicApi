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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chartType } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }
    if (!['pie', 'line'].includes(chartType)) {
        return res.status(400).json({ error: 'Invalid chart type' });
    }
    try {
        const data = yield prisma_1.default.unidades_consumidoras.findMany({
            where: {
                mes_referencia: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
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
    }
    catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getData = getData;
