import { rootType } from "../../interfaces/schemaInterfaces";
import { client } from "../client/client";

export const joinCommunity: rootType = {

    async join( args: { community_id: string }, { user } ) {

        try {

            if( !user?.id ) throw new Error( "user logged out" )

            const data = await client.userscommunitiesbridge.create( {
                data: { ...args, user_id: user?.id }
            } )

            return { ...args, user_id: user?.id }

        } catch( e ) {
            console.log( e )
        }
    }
}