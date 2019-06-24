"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    autenticarJWT(req, res, next) {
        let authorization = req.get('authorization');
        let token = authorization ? authorization.split(' ')[1] : undefined;
        if (token) {
            return res.status(401).json({ status: "error", code: "unauthorized" });
        }
        else {
            next();
        }
    }
}
exports.AuthController = AuthController;
