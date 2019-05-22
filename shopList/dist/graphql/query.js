"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./resources/user/user.schema");
const cupom_schema_1 = require("./resources/cupom/cupom.schema");
const itemCupom_schema_1 = require("./resources/itemCupom/itemCupom.schema");
const historico_schema_1 = require("./resources/historico/historico.schema");
const Query = `
    type Query {
        ${user_schema_1.userQueries}
        ${cupom_schema_1.cupomQuery}
        ${itemCupom_schema_1.itemCupomQuery}
        ${historico_schema_1.historicoQuery}
       
    }
`;
exports.Query = Query;
