import { Post } from "../../../db/orm/dbinterfaces";
import { rootType } from "../../../interfaces/schemaInterfaces";
import { client } from "../../client/client";

export const communityPosts: rootType = {
    async queryCommunityPosts( args: { community_id: string }, { user } ) {

        try {

            const data = await client.userscommunitiesbridge.select<{post?: Post}>( {
                where: { community_id: args?.community_id }, 
                include: {
                    key: { community_id: true },
                    post: {
                        community_id: true
                    }
                }
            } )

            return data
        } catch( e ) {
            console.log( e )
        }
    }
}