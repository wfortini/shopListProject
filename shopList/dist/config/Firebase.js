"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
var serviceAccount = require("/home/wellington/projetoNode/shoplist-664da-firebase-adminsdk-wic97-c4ce212cee.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shoplist-664da.firebaseio.com"
});
exports.default = admin;
