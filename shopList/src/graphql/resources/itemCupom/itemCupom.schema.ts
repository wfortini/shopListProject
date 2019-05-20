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

const itemCupomQuery = `
    iTensCupom(cupomId: String): [ ItemCupom ]    

`;

const itemCupomMutation = `
     
`;

export {
    itemCupomTypes,
    itemCupomQuery,
    itemCupomMutation
}