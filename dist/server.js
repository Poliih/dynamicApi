"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api', dataRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app; // Adicione esta linha para exportar o app
