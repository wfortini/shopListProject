"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./resources/user/user.schema");
const cupom_schema_1 = require("./resources/cupom/cupom.schema");
const Query = `
    type Query {
        ${user_schema_1.userQueries}
        ${cupom_schema_1.cupomQuery}
       
    }
`;
exports.Query = Query;
