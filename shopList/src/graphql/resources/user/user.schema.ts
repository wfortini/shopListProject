const userTypes = `

     type User {
         id: ID!        
         name: String
         username: String
         birthDate: String
         address: String
         zipCode: String
         state: String
         city: String
         addressNumber: String
         password: String
         createdAt: String
         updated: String
     }

     input UserCreateInput {
        name: String!
        username: String!
        birthDate: String
        address: String
        zipCode: String
        state: String
        city: String
        addressNumber: String
        
     }

`;

const userQueries = ` 
    user (id: ID!): User
    currentUser: User

`;

const userMutations = `
    createUser(input: UserCreateInput!): User

`;

export {
    userTypes,
    userQueries,
    userMutations
}