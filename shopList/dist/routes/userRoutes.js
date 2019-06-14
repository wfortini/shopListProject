"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRouters {
    constructor() {
        this.userController = new userController_1.UserController();
        this.router = express_1.Router();
        this.routers();
    }
    routers() {
        this.router.post("/register", this.userController.registerUser);
    }
}
exports.UserRouters = UserRouters;
