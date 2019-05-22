"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemCupomTypes = `

      type ItemCupom {

        id: ID!
        codigo: String
        descricao: String
        qtde: Int
        unidade: String
        valorUnitario: Int
        valorTotal: Int 
        cupom: Cupom!         
        createdAt: String
        updated: String

      }

      input ItemCupomCreateInput {
        
        codigo: String
        descricao: String
        qtde: Int
        unidade: String
        valorUnitario: Int
        valorTotal: Int 
        cupom: String 
        historico: String        

      }

`;
exports.itemCupomTypes = itemCupomTypes;
const itemCupomQuery = `
    itensCupom(cupomId: String): [ ItemCupom ]    

`;
exports.itemCupomQuery = itemCupomQuery;
const itemCupomMutation = `
     
`;
exports.itemCupomMutation = itemCupomMutation;
