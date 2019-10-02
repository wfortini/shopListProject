import { CupomAttributes } from './../models/CupomModel';
import { ProdutoAttributes } from './../models/ProdutoModel';
import { Produto } from './../domain/Produto';
import { NextFunction, Request, Response } from "express";
import db from '../models';
import { Transaction } from "sequelize";
import { Scraping } from "../services/scrap-service";
import { Cupom } from "../domain/cupom";
import { HistoricoInstance } from "../models/HistoricoModel";
import { CupomInstance } from "../models/CupomModel";
import { ItemCupomInstance } from "../models/ItemCupomModel";


export class CupomController {

    public async criarCupom(req: Request, res: Response): Promise<void> {

        //TODO: verificar se nfce já foi importada
        const nfce = req.body;   
        const user = req.app.get("user"); 
        let produtos: ProdutoAttributes[] = []; 
        let result: Cupom;  

        if(!nfce.value){
            res.status(400).send({message: 'nfce invalido.'});
        }

        //const cupomExists : CupomAttributes  = await db.Cupom.find({ where: {
       //                                                     nfce:nfce.value
       //                                         }});
       // if ( cupomExists !== null){
       //     res.status(400).send({ message : 'Cupom já carregado.'});
       // }

        const scraping = new Scraping();        
        result = await  scraping.scrapCupom(nfce.value)
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


                            result.itensCupom.forEach(item => {

                                var produto : ProdutoAttributes = {
                                     CNPJ : result.CNPJ,
                                     bairro : result.bairro,
                                     codigo: item.codigo,
                                     cep : result.cep,
                                     cidade : result.cidade,
                                     desc_1 : item.descricao,
                                     ean : 'xxxxxxxx11111',
                                     endereco : result.endereco,
                                     estado : result.estado,
                                     nomeFantasia : 'teste',
                                     razaoSocial : result.razaoSocial,
                                     ultimoValor : 0,
                                     valor : item.valorUnitario

                                };
                                
                                produtos.push( produto );

                            });

                            //TODO: salvar produto   aqui
                            db.sequelize.transaction((t: Transaction) => {
                                return db.Produto.bulkCreate(produtos, {transaction: t});
                            });                            

                            res.status(200).send( result );

    }


}