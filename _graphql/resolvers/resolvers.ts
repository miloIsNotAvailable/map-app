import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { Client } from '../../db/orm/Client';
import { rootType } from '../../interfaces/schemaInterfaces';
import { Communities, Users } from '../../db/orm/dbinterfaces';
import { Exclusion } from '../../interfaces/custom';

const client = new Client()

// The root provides a resolver function for each API endpoint
export const root: rootType = {
    hello: async( args, { req, res, user } ) => {
      try {
        await user
        console.log( user )
        
        const data = await client.users.select( {} )
  
        return 'Hello!';
      }catch( e ){  }
    },
  
    user: async( args, { req, res, user } ) => {
      
      try {
        await user
        if( !user ) throw new Error( "not logged in" )
        
        const data = await client.users.select( {
          where: { id: (user as Users)?.id }
        } )
  
        console.log( await client.users.select( {} ) )

        return data[0]
      }catch( e: any ){ throw new Error( e ) }
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
    },
  
    async createCommunity( args, { req, res, user } ) {

      try {

        if( !user ) throw new Error( "user logged out" )

        const community_exists = await client.communities.select( {
          where: {
            name: args?.name
          }
        } )

        if( community_exists ) throw new Error( "community already exists" )
        // create unique id for community
        const community_id = uuidv4()
  
        // create the community
        const data = await client.communities.create( {
          data: {  
          community_id,
          ...(args as Exclusion<Communities, keyof { community_id: any, created_at: any }>),
        }
        } )
        
        // add user who created it to users in group
        const bridge = await client.userscommunitiesbridge.create( {
          data: {
            community_id,
            user_id: user?.id
          }
        } )

        console.log( data, bridge )
        return args

      }catch( e ){ 
        console.log( e )
       }

    }
  };
  