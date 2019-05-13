"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./resources/user/user.schema");
const cupom_schema_1 = require("./resources/cupom/cupom.schema");
const Mutation = `
    type Mutation {
        ${user_schema_1.userMutations}
        ${cupom_schema_1.cupomMutation}
        
        
    }
`;
exports.Mutation = Mutation;
