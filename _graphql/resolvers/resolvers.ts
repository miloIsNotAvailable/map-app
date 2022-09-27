import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { Client } from '../../db/orm/Client';
import { rootType } from '../../interfaces/schemaInterfaces';
import { Communities, Post, Users, UsersCommunitiesBridge, Vote } from '../../db/orm/dbinterfaces';
import { Exclusion } from '../../interfaces/custom';
import { inputType } from '../../interfaces/reduxInterfaces';

const client = new Client()

// The root provides a resolver function for each API endpoint
export const root: rootType = {
    hello: async( args, { req, res, user } ) => {
      try {
        await user
        console.log( user )
        
        // const data = await client.post.select( {
        //   include: {
        //     key: {
        //       community_id: true
        //     },
        //     communities: {
        //       community_id: true
        //     }
        //   }
        // } )
        // console.log( data )

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
    },

    async createNewPost( args: inputType, { req, res, user } ) {
      
      try {
        const { type, community, content } = args
        if( !type || !community || !user?.id || !content ) throw new Error( "insufficient data" )

        const data = await client.communities.select( {
          where: {
            name: community
          }
        } )

        if( !data[0]?.community_id ) throw new Error( "community not found" )

        if( type === "image" ) {
          return args
        }

        const newPostData = await client.post.create( {
          data: { 
            post_id: uuidv4(),
            user_id: (args as Post).user_id,
            content: (args as Post).content,
            title: (args as Post).title,
            type: (args as Post).type,
            community_id: data[0]?.community_id }
        } )

        console.log( newPostData )

        return { ...args, community: data[0]?.community_id }
      } 
      catch( e ){
        console.log( e )    
      }
    }, 

    async queryPosts( args, { user } ) {

      try {

        const data = await client.userscommunitiesbridge.select<{post?: Post}>( {
          where: {
            user_id: user?.id
          }, 
          include: {
            key: {
              community_id: true
            },
            post: {
              community_id: true,
            }
          }
        } )
  
        return data

      } catch( e ) {
        console.log( e )
      }
    },

    async community( { community_id }: { community_id: string } ) {

      try {
        if( !community_id ) throw new Error( "community does not exist" )
      
        const data = await client.communities.select( {
          where: { community_id }
        } ) 
         
        return data[0]
      } catch( e ) {
        console.log( e ) 
      }
    },

    async postCreator( { id }: { id: string } ) {

      try {
        if( !id ) throw new Error( "user does not exist" )
      
        const data = await client.users.select( {
          where: { id }
        } ) 
         
        return data[0]
      } catch( e ) {
        console.log( e ) 
      }
    },

    async updateVotes( args: Vote, { user } ) {
      try{
        if( !user?.id ) throw new Error( 'user logged out' )
        const alreadyVoted = await client.vote.select( {
          where: {
            post_id: args.post_id
          },
          AND: {
            user_id: user?.id
          }
        } )

        if( !alreadyVoted[0] ) {
          const data = await client.vote.create( {
            data: {
              vote_id: uuidv4(),
              post_id: args.post_id,
              user_id: user?.id,
              upvoted: args.upvoted,
              downvoted: args.downvoted
            }
          } )

          return args
        }

        const data = await client.vote.update( {
          data: {
            post_id: args.post_id,
            upvoted: args.upvoted,
            downvoted: args.downvoted
          },
          where: {
            post_id: args?.post_id
          },
          AND: {
            user_id: user?.id
          }
        } )

        return args

      } catch( e ) {
        console.log( e )
      }
    },
    async votes( args: { post_id: string }, { user } ) {
      
      try {

        if( !user?.id ) throw new Error( 'user logged out' )
        
        const upvoted = await client.vote.summarize( {
          where: {
            post_id: args.post_id
          },
          AND: {
            upvoted: true
          }
        } )
        const downvoted = await client.vote.summarize( {
          where: {
            post_id: args.post_id
          },
          AND: {
            downvoted: true
          }
        } )

        // console.log( _count )

        const data = await client.vote.select( {
          where: {
            post_id: args.post_id
          },
          AND: {
            user_id: user?.id
          }
        } )

        return { ...data[0], post_id: args.post_id, _count: (upvoted.count - downvoted.count) }
      }catch( e ) {
        console.log( e )
      }
    },

    async searchCommunity( args: { name: string }, { user } ) {

      try {

        const data = await client.communities.select( {
          where: {
            name: { contains: args.name }
          }
        } )

        return data
        
      } catch( e ) {
        console.log( e )
      }

    },

    async hasJoined( args, { user } ) {

      try {
        const data = await client.userscommunitiesbridge.select( {
          where: {
            community_id: args.community_id
          },
          AND: {
            user_id: user?.id
          }
        } )

        return data[0]
      } catch( e ) {
        console.log( e )
      }
    }
  };
  