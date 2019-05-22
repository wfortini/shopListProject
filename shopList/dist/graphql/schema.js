"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const user_schema_1 = require("./resources/user/user.schema");
const cupom_schema_1 = require("./resources/cupom/cupom.schema");
const itemCupom_schema_1 = require("./resources/itemCupom/itemCupom.schema");
const historico_schema_1 = require("./resources/historico/historico.schema");
const SchemaDefinition = `

    type Schema {
        query: Query
        mutation: Mutation
    }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        query_1.Query,
        mutation_1.Mutation,
        user_schema_1.userTypes,
        cupom_schema_1.cupomTypes,
        itemCupom_schema_1.itemCupomTypes,
        historico_schema_1.historicoTypes
    ],
});
