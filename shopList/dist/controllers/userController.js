"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                const user = req.body;
                result = yield models_1.default.sequelize.transaction((t) => {
                    return models_1.default.User.create(user, { transaction: t });
                });
            }
            catch (e) {
                res.status(400).send({ message: 'erro api', errors: e.errors });
                console.log(e);
            }
            res.status(200).send(result);
        });
    }
    findByUID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                result = yield models_1.default.User.findOne({ where: { id: req.params.uid }
                });
                if (!result) {
                    res.status(404).send("User not found");
                }
                else {
                    res.status(200).send(result);
                }
            }
            catch (error) {
                res.status(400).send(error.errors);
            }
        });
    }
}
exports.UserController = UserController;
