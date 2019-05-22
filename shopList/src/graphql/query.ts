import { userQueries } from "./resources/user/user.schema";
import { cupomQuery } from "./resources/cupom/cupom.schema";
import { itemCupomQuery } from "./resources/itemCupom/itemCupom.schema";
import { historicoQuery } from "./resources/historico/historico.schema";

const Query = `
    type Query {
        ${userQueries}
        ${cupomQuery}
        ${itemCupomQuery}
        ${historicoQuery}
       
    }
`;

export {
    Query
}