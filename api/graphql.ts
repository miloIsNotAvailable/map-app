import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { Client } from "../db/orm/Client";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { Users } from "../db/orm/dbinterfaces";
import { rootType } from "../interfaces/schemaInterfaces";
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
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

const client = new Client()

// The root provides a resolver function for each API endpoint
var root: rootType = {
  hello: async( args, { req, res } ) => {
    try {
      // console.log( await req.cookies )
      console.log( jwt.verify( req.cookies["access_token"], process.env.ACCESS_TOKEN! ) )
    }catch( e ){  }
    return 'Hello!';
  },

  getUserData: async( args, context ) => {
        
    const { req, res } = context

    try {
      // check if user exists
      const exists = await client.users.select( {
        where: { email: args?.email }
      } ) as Users[]
      
      // sign up logic
      if( !!args?.username ) {
        // throw error if email exists
        if( exists[0] ) return Error( "user already exists" )
        
        const data = await client.users.create( {
          data: {
            id: uuidv4(),
            email: args?.email,
            name: args?.username,
            password: await bcrypt.hash( args?.username, 10 )
          }
        } ) 

        const refresh_token = jwt.sign( data, process.env.REFRESH_TOKEN!, {

        } )
  
        const acc_token = jwt.sign( data, process.env.ACCESS_TOKEN!, {
            expiresIn: '15s'
        } )
  
        res.setHeader( 
          "Set-Cookie",  
         [cookie.serialize(
            "refresh_token", refresh_token, {
              httpOnly: true,
              secure: true,
              maxAge: 60 * 60 * 24 * 7,
              path: "/"
            } 
          ),
          cookie.serialize(
            "access_token", acc_token, {
              httpOnly: true,
              secure: true,
              maxAge: 60 * 60 * 24 * 7,
              path: "/"
            } 
          )
        ]
        )

        return {
          __typename: "SignUpData",
          ...args
        }
      }
      // login logic
      if( !exists[0] ) return Error( "user not found" )
      
      const refresh_token = jwt.sign( exists[0], process.env.REFRESH_TOKEN!, {

      } )

      const acc_token = jwt.sign( exists[0], process.env.ACCESS_TOKEN!, {
        expiresIn: "15s"
      } )

      res.setHeader( 
        "Set-Cookie",  
       [cookie.serialize(
          "refresh_token", refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
          } 
        ),
        cookie.serialize(
          "access_token", acc_token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
          } 
        )
      ]
      )

      return {
        __typename: "LoginData",
        ...args
      }
    } catch( e: any ) {
      return Error( e )
    }
  }
};

export default graphqlHTTP( ( req: any, res ) => {
  
  const refresh_token = req.cookies["refresh_token"]
  const acc_token = req.cookies["access_token"]
  // console.log( acc_token )

  const verify = jwt.verify( 
    refresh_token, 
    process.env.REFRESH_TOKEN!, ( err: any, token: any ) => {
      if( err ) return {
        schema, 
        rootValue: root, 
        graphiql: true, 
        context: { req, res },
      }
      jwt.verify( acc_token, process.env.ACCESS_TOKEN!, ( err: any, rsult: any ) => {

        if( err ) res.setHeader( 
        "Set-Cookie", 
        cookie.serialize(
          "access_token",
          jwt.sign( { id: token?.id, email: token?.email, name: token?.name }, process.env.ACCESS_TOKEN!, { expiresIn: '2m' } ), {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
          }
        ) 
      )
      } ) 
    } )
  
  return {
    schema, 
    rootValue: root, 
    graphiql: true, 
    context: { req, res },
  }
} )
