"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cupomController_1 = require("../controllers/cupomController");
const authController_1 = require("../controllers/authController");
class CupomRouters {
    constructor() {
        this.cupomController = new cupomController_1.CupomController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routers();
    }
    routers() {
        this.router.post("", this.authController.autenticarJWT, this.cupomController.criarCupom);
    }
}
exports.CupomRouters = CupomRouters;
