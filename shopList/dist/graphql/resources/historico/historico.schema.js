"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const historicoTypes = `

      type Historico {

        id: ID!        
        descricao: String
        user: User
        dataIncial: String
        dataFinal: String
        numHistorico: Int
        categoria: Int
        createdAt: String
        updatedAt: String
       
      }

      input historicoCreateInput {        
        descricao: String
        categoria: Int 
        user: String
        dataIncial: String             

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
