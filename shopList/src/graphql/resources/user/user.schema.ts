const userType = `

     type User {
         id: ID!,         
         name: String;
         username: String;
         birthDate: Date;
         address: String;
         zipCode: String;
         state: String;
         city: String;
         addressNumber: String;
         password: String;
         createdAt: String;
         updated: String;
     }

     input userCreateInput {
        name: String!;
        username: String!;
        birthDate: Date;
        address: String;
        zipCode: String;
        state: String;
        city: String;
        addressNumber: String;
        
     }

`;

const userQueries = ` 
    users(id: ID!): User
    currentUser: User

`;

const userMutations = `
    createUser(input: UserCreateInput!): User

`;

export {
    userType,
    userQueries,
    userMutations
}