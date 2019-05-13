import { userMutations } from "./resources/user/user.schema";
import { cupomMutation } from "./resources/cupom/cupom.schema";

const Mutation = `
    type Mutation {
        ${userMutations}
        ${cupomMutation}
        
        
    }
`;

export {
    Mutation
}