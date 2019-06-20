import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';
import { HistoricoInstance } from '../../../models/HistoricoModel';

export const historicoResolvers = {

    Query: {

        historico: (parent, {user}, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            return db.Historico
                     .findAll({
                         where: {user: user}
                     }).then((historico: HistoricoInstance[]) => {
                         if(historico) throw new Error(`Historico with id ${user} not found!`);
                         return historico;
                     });
        }
    },

    Mutation : {

        createHistorico: (parent, args, {db}:{db: DbConnection}, info: GraphQLResolveInfo) =>   {
               return db.sequelize.transaction((t: Transaction) => {

                    args.input.user = 'wellington';
                    return db.Historico.find({
                        where:{
                            user: args.input.user,
                            categoria: args.categoria,
                            dataFinal: null
                        }
                    }).then((historico: HistoricoInstance) => {
                          
                           args.input.dataIncial = new Date();
                           if(historico){
                               args.input.numHistorico = historico.numHistorico + 1;
                               
                           }else{
                               args.input.numHistorico = 1; 
                           }
                           return db.Historico.create(args.input, {transaction: t});
                    });

                   
               }); // manipular erro aqui

        }

    }
}