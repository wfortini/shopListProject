import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { Query } from './query';
import { Mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { cupomTypes } from './resources/cupom/cupom.schema';
import { itemCupomTypes } from './resources/itemCupom/itemCupom.schema';
import { historicoTypes } from './resources/historico/historico.schema';
import { userResolvers } from './resources/user/user.resolvers';
import { cupomResolvers } from './resources/cupom/cupom.resolvers';
import { historicoResolvers } from './resources/historico/historico.resolvers';

const resolvers = merge(
     userResolvers,
     cupomResolvers,
     historicoResolvers

);

const SchemaDefinition = `

    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,       
        userTypes,
        cupomTypes,
        itemCupomTypes,
        historicoTypes
    ],
    resolvers
});