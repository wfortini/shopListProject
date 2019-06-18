import { UserInstance } from './../models/UserModel';

import { NextFunction, Request, Response } from "express";
import db from '../models';
import { Transaction } from "sequelize";

export class UserController {

    
    public async registerUser(req: Request, res: Response): Promise<void> {
        
        let result = undefined;
        try{
            const user : UserInstance = req.body;
            result = await db.sequelize.transaction((t: Transaction) => {
                return db.User.create(user, {transaction: t});
            });
        }catch(e){
            res.status(400).send(e.errors );
           console.log(e);
        }       
        res.status(200).send( result );

    }

    public async findByUID(req: Request, res: Response): Promise<void> {
           try{
               var result = await db.User.findOne({ where:
                                        { id: req.params.uid} 
                                    });
           }catch(error){
              res.status(400).send( error.errors );
           }
           
           res.status(200).send( result) ;


    }

}