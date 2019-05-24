"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const historicoTypes = `

      type Historico {

        id: ID!        
        description: String
        user: User!
        dataIncial: String
        dataFinal: String
        numHistorico: Int
        createdAt: String
        updatedAt: String
       
      }

      input historicoCreateInput {

        id: ID!        
        description: String
        user: String!
        dataIncial: String
        dataFinal: String
        numHistorico: Int        

      }

`;
exports.historicoTypes = historicoTypes;
const historicoQuery = `
    
      historico (user: String) : [ Historico ]
    

`;
exports.historicoQuery = historicoQuery;
const historicoMutation = `
    
     createHistorico(input: historicoCreateInput) : Historico

`;
exports.historicoMutation = historicoMutation;
