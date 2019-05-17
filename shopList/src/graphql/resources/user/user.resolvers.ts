import { UserInstance } from './../../../models/UserModel';
import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { Mutation } from '../../mutation';
import { Transaction } from 'sequelize';

export const userResolvers = {

    Query: {

        user: (parent, {id}, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            return db.User
                     .findById(id)
                     .then((user: UserInstance) => {
                         if(user) throw new Error(`User with id ${id} not found!`);
                         return user;
                     });
        }
    },

    Mutation : {

        createUser: (parent, args, {db}:{db: DbConnection}, info: GraphQLResolveInfo) =>   {
               return db.sequelize.transaction((t: Transaction) => {
                   return db.User.create(args.input, {transaction: t});
               });

        }

    }
}