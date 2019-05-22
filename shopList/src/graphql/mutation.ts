import { userMutations } from "./resources/user/user.schema";
import { cupomMutation } from "./resources/cupom/cupom.schema";
import { itemCupomMutation } from "./resources/itemCupom/itemCupom.schema";
import { historicoMutation } from "./resources/historico/historico.schema";

const Mutation = `
    type Mutation {
        ${userMutations}
        ${cupomMutation}
        ${itemCupomMutation}
        ${historicoMutation}
        
        
    }
`;

export {
    Mutation
}