import { FC } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useHasJoinedQuery, useJoinCommunityMutation } from "../../../../redux/api/fetchApi";
import Fallback from "../../../assets/Fallback";
import { styles } from "../../build/SearchStyles";

const JOINED_QUERY = `
query hasJoined( $community_id: String ){
    hasJoined( community_id:$community_id ){
      community_id
      user_id
    }
  }`

const JOIN_COMMUNTIY = `
mutation Join( $community_id: String ){
    join( community_id: $community_id ){
      community_id
      user_id
    }
  }
`

interface JoinProps {
    community_id: string
}

const Join: FC<JoinProps> = ( { community_id } ) => {

    const { data, isLoading } = useHasJoinedQuery( {
        body: JOINED_QUERY,
        variables: { community_id }
    } )

    const { data: authData } = useAuthContext()
    const [ joinCommunity, { data: joinData, isLoading: loadingData } ] = useJoinCommunityMutation()

    const handleJoin = () => {
        joinCommunity( {
            body: JOIN_COMMUNTIY,
            variables: { community_id }
        } )
    }

    if( isLoading ) return (
        <Fallback
            width="4ch"
            padding="0 1.5rem"
            height="calc(var(--font-size) + 1rem)"
            borderRadius="1rem"
            placeSelf="center"
        />
    )

    return (
        <button 
            className={ styles.join_button }
            disabled={ !!data?.hasJoined?.user_id || !authData?.user?.id || loadingData }
            onClick={ handleJoin }
        >
            { !!data?.hasJoined?.user_id ? "joined" : 'join' }
        </button>
    )
}

export default Join