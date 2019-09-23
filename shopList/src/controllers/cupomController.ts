import { NextFunction, Request, Response } from "express";
import db from '../models';
import { Transaction } from "sequelize";
import { Scraping } from "../services/scrap-service";
import { Cupom } from "../domain/cupom";
import { HistoricoInstance } from "../models/HistoricoModel";
import { CupomInstance } from "../models/CupomModel";
import { ItemCupomInstance } from "../models/ItemCupomModel";
import { ProdutoInstance } from "../models/ProdutoModel";

export class CupomController {

    public async criarCupom(req: Request, res: Response): Promise<void> {

        //TODO: verificar se nfce já foi importada
        const nfce = req.body;   
        const user = req.app.get("user"); 
        produtos: ProdutoInstance[] = [];   

        if(!nfce.value){
            res.status(400).send({message: 'nfce invalido.'});
        }

        const scraping = new Scraping();        
        const result = await  scraping.scrapCupom(nfce.value)
                            .then((cupom: any) => {

                                if(cupom.itensCupom == null || cupom.itensCupom.length == 0){
                                    throw new Error(`Cupom not found!`);
                                }
                                
                                //var user = 'wellington';
                                cupom.user = user;

                            return db.Historico.find({
                                where: {
                                            user: user,
                                            dataFinal: null
                                        }
                            }).then((historico: HistoricoInstance) => {                               
                                    if(!historico) throw new Error(`Historico with user ${user} not found!`);
                                        
                                    cupom.historico = historico.id;
                                    
                                    return db.sequelize.transaction((t: Transaction) => {
                                        return db.Cupom.create(cupom, {transaction: t});
                                    }).then((cupomWithId : CupomInstance) => {
                                        
                                            cupom.itensCupom.forEach(element => {                                   
                                                element.cupom = cupomWithId.id;
                                            });
                                            
                                            return db.sequelize.transaction((t: Transaction) => {
                                                return db.ItemCupom.bulkCreate(cupom.itensCupom, {transaction: t, returning: true});                                           
                                                }).then((itens: ItemCupomInstance[]) =>{                                                    
                                                    cupom.itensCupom = itens;
                                                    return cupom;

                                                }); // fim promise created itensCupom                                
                                    
                                    }); // fim promise created cupom
                                        
                            }); // fim promise  obter historico                               
                                
                            }).catch((error) => {
                                res.status(400).send(error);
                                console.log(`======= ${error}`);
                            });


                            //TODO: salvar produto aqui

                            res.status(200).send( result );

    }


}