import { v4 } from "uuid";
import { Comments, Responses } from "../../../db/orm/dbinterfaces";
import { rootType } from "../../../interfaces/schemaInterfaces";
import { client } from "../../client/client";

export const comments: rootType = {
    
    async createComments( args: { post_id: string, content: string }, { user } ) {

        try {

            const data = await client.comments.create( {
                data: {
                    user_id: user?.id,
                    comment_id: v4(),
                    content: args.content,
                    post_id: args?.post_id
                }
            } )
         
            return args
        } catch( e ) {
            console.log( e )
        }
    },

    async comments( args: { post_id: string }, { user } ) {

        try {
            
            const data = await client.comments.select( {
                where: { post_id: args?.post_id }
            } )
            
            // const e = ( data: any ) => {
                
            // }

            return data

        } catch( e ) {
            console.log( e )
        }
    },

    async createResponse( args: Responses, { user } ){

        try {   

            if( !user?.id ) throw new Error( "user not logged in" )

            const response = await client.responses.create( {
                data: {
                    ...args,
                    response_id: v4(),
                    user_id: user?.id,
                }
            } )

            const comment = await client.comments.create( {
                data: {
                    comment_id: v4(),
                    content: args.content,
                    post_id: args?.post_id,
                    user_id: user?.id,
                }
            } )

            return args

        } catch( e ) {
            console.log( e )
        }
    },

    async responses( args: { comment_id: string, post_id: string }, { user } ){

        try {

            const data = await client.responses.select( {
                where: { comment_id: args?.comment_id },
                include: {
                    key: { comment_id: true },
                    comments: { comment_id: true }
                }
            } )

            // initial query
            const init = await client.comments.select( {
                where: { post_id: args?.post_id }
            } ) as (Comments & Responses)[]

            const cte = async( data: (Comments & Responses)[] ) => {

                if( !data.length ) {
                    console.log( 'dead end!' )
                    return
                }

                const d = data.forEach( async( { comment_id } ) => {
                
                    let data = await client.responses.select( {
                        where: { comment_id }
                    } ) as (Comments & Responses)[] 

                    if( !data.length ) {
                        console.log( 'dead end, guy' )
                        return
                    } 

                    data = data.map( n => ({ ...n, comment_id: n.response_id }) )
                    console.log( data )
                    
                    cte( data )
                });
            }

            const e = cte( init )
            console.log( e )

            return init

        } catch( e ){
            console.log( e )
        }

    }
}