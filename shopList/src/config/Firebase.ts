import * as admin from 'firebase-admin';

var serviceAccount = require("/home/wellington/projetoNode/shoplist-664da-firebase-adminsdk-wic97-c4ce212cee.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shoplist-664da.firebaseio.com"
    });

export default admin;