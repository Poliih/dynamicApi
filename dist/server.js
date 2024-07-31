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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/data/:chartType', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const { chartType } = req.params;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const data = yield prisma.inmetCoGoA002Goiania.groupBy({
            by: ['Data'],
            _avg: {
                PrecipitacaoTotalHorario: true,
                PressaoAtmosfericaAoNivelDaEstacaoHoraria: true,
                TemperaturaDoArBulboSeco: true,
                TemperaturaDoPontoDeOrvalho: true,
                TemperaturaMaximaNaHoraAnt: true,
                TemperaturaMinimaNaHoraAnt: true,
                TemperaturaOrvalhoMaxNaHoraAnt: true,
                TemperaturaOrvalhoMinNaHoraAnt: true,
                UmidadeRelMaxNaHoraAnt: true,
                UmidadeRelMinNaHoraAnt: true,
                UmidadeRelativaDoAr: true,
                VentoDirecaoHoraria: true,
                VentoRajadaMaxima: true,
                VentoVelocidadeHoraria: true
            },
            where: {
                Data: {
                    gte: start,
                    lte: end,
                },
            },
        });
        let formattedData;
        switch (chartType) {
            case 'pie':
                formattedData = data.map((d) => {
                    var _a;
                    return ({
                        date: d.Data.toISOString().split('T')[0],
                        precipitation: (_a = d._avg.PrecipitacaoTotalHorario) !== null && _a !== void 0 ? _a : 0,
                    });
                });
                break;
            default:
                return res.status(400).json({ error: 'Invalid chart type' });
        }
        res.json(formattedData);
    }
    catch (error) {
        console.error('Error in /data/:chartType endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = app;
