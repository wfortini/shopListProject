import { CupomInstance } from './../../../models/CupomModel';
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { Scraping } from '../../../services/scrap-service';

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
                scraping.scrapCupom(nfce);
             }

       }


}