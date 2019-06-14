"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const userRoutes_1 = require("./routes/userRoutes");
class App {
    constructor() {
        this.express = express();
        this.config();
        this.routes();
    }
    routes() {
        this.express.use("/api/user", new userRoutes_1.UserRouters().router);
    }
    config() {
        this.express.set("port", process.env.PORT || 3000);
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(cors());
    }
}
exports.default = new App().express;
