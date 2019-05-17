import { userQueries } from "./resources/user/user.schema";
import { cupomQuery } from "./resources/cupom/cupom.schema";
import { itemCupomQuery } from "./resources/itemCupom/itemCupom.schema";

const Query = `
    type Query {
        ${userQueries}
        ${cupomQuery}
        ${itemCupomQuery}
       
    }
`;

export {
    Query
}