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