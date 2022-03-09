import { buildSchema } from 'graphql';

export const graphQlSchema = buildSchema(`
        
        type User {
          name: String
          email: String
          id: Int
        }

        type Movie{
          title: String!
          releaseYear : Int
        }
        
        type Movies {
            movies: [Movie]   
        }
        type Players {
          players:[User]
        }
        type Play {
          title: String!
          options: [Int!]!
        }

        input CreateMatchInput{
          name: String!
          email: String!
        }

        input PlayAnswerInput{
          title: String!
          answer: Int!
        }

        type RootQuery {
          users: [User]
          players:[User]
          movies(limit: Int): [Movie]
          movie(title: String!): Movie
          play: [Play]
        }

        type RootMutation {
          createMatch(input:CreateMatchInput) : User
          submitPlay(input: [PlayAnswerInput!]!): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
  `);
