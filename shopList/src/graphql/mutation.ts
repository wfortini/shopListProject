import { userMutations } from "./resources/user/user.schema";
import { cupomMutation } from "./resources/cupom/cupom.schema";
import { itemCupomMutation } from "./resources/itemCupom/itemCupom.schema";

const Mutation = `
    type Mutation {
        ${userMutations}
        ${cupomMutation}
        ${itemCupomMutation}
        
        
    }
`;

export {
    Mutation
}