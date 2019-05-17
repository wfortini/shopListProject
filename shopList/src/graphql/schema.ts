import { makeExecutableSchema } from 'graphql-tools';
import { Query } from './query';
import { Mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { cupomTypes } from './resources/cupom/cupom.schema';
import { itemCupomTypes } from './resources/itemCupom/itemCupom.schema';

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
        itemCupomTypes
    ],
    
});