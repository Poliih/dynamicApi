"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const router = (0, express_1.Router)();
router.get('/data/:chartType', dataController_1.getData);
exports.default = router;
