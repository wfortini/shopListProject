"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.userTypes = userTypes;
const userQueries = ` 
    users(id: ID!): User
    currentUser: User

`;
exports.userQueries = userQueries;
const userMutations = `
    createUser(input: UserCreateInput!): User

`;
exports.userMutations = userMutations;
