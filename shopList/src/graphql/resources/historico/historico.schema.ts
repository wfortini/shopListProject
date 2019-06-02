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

const historicoQuery = `    
      historico (user: String) : [ Historico ]    

`;

const historicoMutation = `    
     createHistorico(input: historicoCreateInput) : Historico

`;

export {
    historicoTypes,
    historicoQuery,
    historicoMutation
}