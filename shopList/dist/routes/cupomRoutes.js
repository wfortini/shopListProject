"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cupomController_1 = require("../controllers/cupomController");
class CupomRouters {
    constructor() {
        this.cupomController = new cupomController_1.CupomController();
        this.router = express_1.Router();
        this.routers();
    }
    routers() {
        this.router.post("", this.cupomController.criarCupom);
    }
}
exports.CupomRouters = CupomRouters;
