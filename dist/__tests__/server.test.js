"use strict";
// src/__tests__/serve.test.ts
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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server")); // Ajuste o caminho conforme necessário
describe('GET /data/:chartType', () => {
    it('should return 400 if startDate or endDate is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get('/data/pie');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Start date and end date are required' });
    }));
    it('should return formatted data for pie chart', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get('/data/pie')
            .query({ startDate: '2023-07-01', endDate: '2023-07-02' });
        console.log('Response from API:', res.body); // Log da resposta da API
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { date: '2023-07-01', precipitation: 5 },
            { date: '2023-07-02', precipitation: 10 }, // Ajuste conforme os dados reais
        ]);
    }));
});
