"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as admin from 'firebase-admin';
const Firebase_1 = require("../config/Firebase");
class AuthController {
    constructor() {
    }
    autenticarJWT(req, res, next) {
        let authorization = req.get('authorization');
        let token = authorization ? authorization.split(' ')[1] : undefined;
        if (token !== undefined) {
            console.log(`  token ${token}`);
            Firebase_1.default.auth().verifyIdToken(token)
                .then(function (decodedToken) {
                var uid = decodedToken.uid;
                console.log(`  uid ${uid}`);
                req.app.set("user", uid);
                req.params.user = uid;
                next();
            }).catch(function (error) {
                var code = error.code;
                if (code === 'auth/id-token-expired') {
                    return res.status(400).json({ status: "error", code: "token-expirad" });
                }
                else if (code === 'auth/argument-erro') {
                    return res.status(400).json({ status: "error", code: "token-invalid" });
                }
                console.log(error);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            });
        }
        else {
            return res.status(401).json({ status: "error", code: "unauthorized" });
        }
    }
}
exports.AuthController = AuthController;
