import { Request, Response } from "express";
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

// i'll move all this later
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  
  type LoginData {
    email: String
    password: String
  }

  type SignUpData {
    email: String
    password: String
    username: String
  }

  union GetData = SignUpData | LoginData

  type Query {
    hello: String
  }
  
  type Mutation {
    getUserData( email: String, password: String, username: String ): GetData
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello!';
  },

  getUserData: ( args: any ) => {
    if( !!args?.username ) return {
      __typename: "SignUpData",
      ...args
    }
    
    return {
      __typename: "LoginData",
      ...args
    }
  }
};

export default graphqlHTTP( {
        schema, 
        rootValue: root, 
        graphiql: true
    } )
