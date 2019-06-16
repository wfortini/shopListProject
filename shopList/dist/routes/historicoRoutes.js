"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historicoController_1 = require("../controllers/historicoController");
class HistoricoRouters {
    constructor() {
        this.historicoController = new historicoController_1.HistoricoController();
        this.router = express_1.Router();
        this.routers();
    }
    routers() {
        this.router.post("", this.historicoController.criarHistorico);
    }
}
exports.HistoricoRouters = HistoricoRouters;
