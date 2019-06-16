import { HistoricInstance } from './../models/HistoricModel';
import { NextFunction, Request, Response } from "express";
import db from '../models';
import { Transaction } from 'sequelize';
import { HistoricoInstance } from '../models/HistoricoModel';

export class HistoricoController {

    public async criarHistorico(req: Request, res: Response): Promise<void> {

        const result = await db.sequelize.transaction((t: Transaction) => {

                        let historico: HistoricInstance = req.body;
                        historico.user = 'wellington'; //TODO: somente para teste
                        return db.Historico.find({
                            where:{
                                user: historico.user,
                                categoria: historico.categoria,
                                dataFinal: null
                            }
                        }).then((historico: HistoricoInstance) => {
                            
                            historico.dataInicial = new Date();
                            if(historico){
                                historico.numHistorico = historico.numHistorico + 1;
                                
                            }else{
                                historico.numHistorico = 1; 
                            }
                            return db.Historico.create(historico, {transaction: t});
                        });
           
                   }).catch((error) => {
                        res.status(400).send(error);
                        console.log(`======= ${error}`);
                   });
                   

                   res.status(200).send({ result });
    }

}