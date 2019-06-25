import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';

var serviceAccount = require("path/to/serviceAccountKey.json");

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

        if(token){
            return res.status(401).json({ status: "error", code: "unauthorized" });

        }else{
            next();
        }


    }


}