import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';

var serviceAccount = require("/home/wellington/projetoNode/shoplist-664da-firebase-adminsdk-wic97-c4ce212cee.json");

export class AuthController  {   
     
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://shoplist-664da.firebaseio.com"
            });
    }    

    public autenticarJWT(req: Request, res: Response, next: NextFunction) {

        let authorization: string = req.get('authorization');
        let token: string = authorization ? authorization.split(' ')[1] : undefined;
        
        if(token !== undefined ){
            console.log(`  token ${token}`);
            admin.auth().verifyIdToken(token)
            .then(function(decodedToken) {
              var uid = decodedToken.uid;
              console.log(`  uid ${uid}`);
              req.params.uid = uid;
              next();
            }).catch(function(error) {
                var code = error.code;
                if(code === 'auth/id-token-expired'){
                    return res.status(400).json({ status: "error", code: "token-expirad" });
                }else if(code === 'auth/argument-erro'){
                    return res.status(400).json({ status: "error", code: "token-invalid" }); 
                }
                console.log(error);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            });           

        }else{
            return res.status(401).json({ status: "error", code: "unauthorized" });
        }


    }


}