import { FC } from "react";
import { useActionsProvider } from "../../../../../contexts/ActionsContext";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import Fallback from "../../../Fallback";
import { styles } from "../../build/PostStyles";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

interface VoteProps {
    votes: number
    post_id: string
}

const Vote: FC<VoteProps> = ( ) => {

    // const [ { votes: vote }, dispatch ] = useReducer( reducer, { votes } )

    const { isLoading, data } = useActionsProvider()
    const { isLoading: authLoading } = useAuthContext()
    
    const formatter= Intl.NumberFormat( 'en', { notation: "compact", compactDisplay: "short" } )

    if( isLoading || authLoading ) return (
        <div className={ styles.action_item_wrap }>
            <Fallback 
                width="100%" 
                height="100%" 
                borderRadius={ "inherit" }
            />
        </div>
    )

    return (
        <div className={ styles.action_item_wrap }>
            <Upvote/>
            { data?.votes?._count ? formatter.format( data?.votes?._count ) : 0 }
            <Downvote/>
        </div>
    )
}

export default Vote