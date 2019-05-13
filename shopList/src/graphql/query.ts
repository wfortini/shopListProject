import { userQueries } from "./resources/user/user.schema";
import { cupomQuery } from "./resources/cupom/cupom.schema";

const Query = `
    type Query {
        ${userQueries}
        ${cupomQuery}
       
    }
`;

export {
    Query
}