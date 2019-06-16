import { NextFunction, Request, Response } from "express";
import db from '../models';
import { Transaction } from 'sequelize';
import { HistoricoInstance } from '../models/HistoricoModel';

export class HistoricoController {

    public async criarHistorico(req: Request, res: Response): Promise<void> {

        let result = undefined;
        try{
            result = await db.sequelize.transaction((t: Transaction) => {

                let historicoInput: HistoricoInstance = req.body;
                historicoInput.user = 'wellington'; //TODO: somente para teste
                return db.Historico.find({
                    where:{
                        user: historicoInput.user,
                        categoria: historicoInput.categoria,
                        dataFinal: null
                    }
                }).then((historico: HistoricoInstance) => {
                    
                    historicoInput.dataInicial = new Date();
                    if(historico){
                        historicoInput.numHistorico = historico.numHistorico + 1;
                        
                    }else{
                        historicoInput.numHistorico = 1; 
                    }
                    return db.Historico.create(historicoInput, {transaction: t});
                });
   
           });
           
        }catch(e){
            res.status(400).send(e.errors);
            console.log(`======= ${e}`);
        }

        res.status(200).send({ result });
                  
    }

}