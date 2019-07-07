import { NextFunction, Request, Response } from "express";
//import * as admin from 'firebase-admin';
import admin from '../config/Firebase';

export class AuthController  {   
     
    constructor(){
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
              req.app.set("user", uid);
              req.params.user = uid;
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