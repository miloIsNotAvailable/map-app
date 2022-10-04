import { v4 } from "uuid";
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

        const data = await client.comments.select( {
            where: { post_id: args?.post_id }
        } )

        return data
    }
}