import { v4, V4Options } from "uuid";
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

            const response_id = v4()

            // const comment = await client.comments.create( {
            //     data: {
            //         comment_id: args?.comment_id,
            //         content: args.content,
            //         post_id: args?.post_id,
            //         user_id: user?.id,
            //     }    
            // } )

            const response = await client.nestedresponses.create( {
                data: {
                    content: args.content,
                    comment_id: args?.comment_id,
                    response_id,
                    post_id: args.post_id,
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

            if( !user?.id ) throw new Error( "log in to respond" )

            const data = await client.nestedresponses.select( {
                where: { comment_id: args?.comment_id },
            } )

            return data

        } catch( e ){
            console.log( e )
        }

    }
}