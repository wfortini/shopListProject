const cupomTypes = `

      type Cupom {

        id: ID!
        razaoSocial: String
        CNPJ: String
        endereco: String
        bairro: String
        estado: String
        cep: String
        cidade: String
        qtdeTotalItens: Int
        formaPG: String
        valorPG: String
        dataCompra: String 
        user: User!        
        nfce: String
        itensCupom: [ ItemCupom! ]!
        createdAt: String
        updated: String
      }

      input cupomCreateInput {

        razaoSocial: String
        CNPJ: String
        endereco: String
        bairro: String
        estado: String
        cep: String
        cidade: String
        qtdeTotalItens: Int
        formaPG: String
        valorPG: String
        dataCompra: String  
        user: String
        nfce: String  

      }

`;

const cupomQuery = `

    cupons(user: String): [ Cupom ]
    cupom(nfce: String) : Cupom

`;

const cupomMutation = `
     createCupom(nfce : String) : Cupom

`;

export {
    cupomTypes,
    cupomQuery,
    cupomMutation
}