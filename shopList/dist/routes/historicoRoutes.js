"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historicoController_1 = require("../controllers/historicoController");
const authController_1 = require("../controllers/authController");
class HistoricoRouters {
    constructor() {
        this.historicoController = new historicoController_1.HistoricoController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routers();
    }
    routers() {
        this.router.post("", this.authController.autenticarJWT, this.historicoController.criarHistorico);
    }
}
exports.HistoricoRouters = HistoricoRouters;
