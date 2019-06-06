import { CupomInstance } from './../../../models/CupomModel';
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { Scraping } from '../../../services/scrap-service';
import { Cupom } from '../../../domain/cupom';
import { Transaction } from 'sequelize';
import  * as uuidv1  from 'uuid/v1';
import { ItemCupom } from '../../../domain/itemCupom';
import { HistoricoInstance } from '../../../models/HistoricoModel';

export const cupomResolvers = {

       Query: {

           cupons: (parent, {id}, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
               return db.Cupom
               .findAll({
                   where: {user: id}
               })
           },

           cupom: (parent, {nfce}, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
                return db.Cupom
                           .find({
                               where: {nfce: nfce}
                           }).then((cupom: CupomInstance) => {
                            if(cupom) throw new Error(`Cupom with nfce ${nfce} not found!`);
                             return cupom;
                           })
           }
       },

       Mutation: {
             createCupom: (parent, {nfce}, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
                  
                const scraping = new Scraping();
                return  scraping.scrapCupom(nfce)
                        .then((cupom: Cupom) => {

                             if(cupom.itensCupom == null || cupom.itensCupom.length == 0){
                                throw new Error(`Cupom not found!`);
                             }                         

                            cupom.id = uuidv1();
                            var user = 'wellington';
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
                                            element.id = uuidv1();
                                            element.cupom = cupomWithId.id;
                                        });
                                        
                                        return db.sequelize.transaction((t: Transaction) => {
                                            return db.ItemCupom.bulkCreate(cupom.itensCupom, {transaction: t});                                           
                                            }).then((itens: ItemCupom[]) =>{
                                                cupom.itensCupom = itens;
                                                return cupom;

                                            }); // fim promise created itensCupom                                
                                
                                }); // fim promise created cupom
                                    
                           }); // fim promise  obter historico                               
                            
                        }).catch((r) => console.log(r));

                     
             }

       }


}