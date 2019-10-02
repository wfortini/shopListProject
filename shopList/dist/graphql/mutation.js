"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./resources/user/user.schema");
const cupom_schema_1 = require("./resources/cupom/cupom.schema");
const itemCupom_schema_1 = require("./resources/itemCupom/itemCupom.schema");
const historico_schema_1 = require("./resources/historico/historico.schema");
const Mutation = `
    type Mutation {
        ${user_schema_1.userMutations}
        ${cupom_schema_1.cupomMutation}
        ${itemCupom_schema_1.itemCupomMutation}
        ${historico_schema_1.historicoMutation}
        
        
    }
`;
exports.Mutation = Mutation;
