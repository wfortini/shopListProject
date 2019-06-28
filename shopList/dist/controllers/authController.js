"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
var serviceAccount = require("/home/wellington/projetoNode/shoplist-664da-firebase-adminsdk-wic97-c4ce212cee.json");
class AuthController {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://shoplist-664da.firebaseio.com"
        });
    }
    autenticarJWT(req, res, next) {
        let authorization = req.get('authorization');
        let token = authorization ? authorization.split(' ')[1] : undefined;
        if (token !== undefined) {
            console.log(`  token ${token}`);
            admin.auth().verifyIdToken(token)
                .then(function (decodedToken) {
                var uid = decodedToken.uid;
                console.log(`  uid ${uid}`);
                req.params.uid = uid;
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
