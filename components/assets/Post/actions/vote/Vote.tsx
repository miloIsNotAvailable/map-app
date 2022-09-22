import { FC, useEffect, useState } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { postActionsState } from "../../../../../interfaces/reduxInterfaces";
import { styles } from "../../build/PostStyles";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

interface VoteProps {
    votes: number
}

const Vote: FC<VoteProps> = ( { votes } ) => {

    const formatter = Intl.NumberFormat( 'en', { notation: 'compact' } )
    const [ { postActions } ] = useRedux<postActionsState>()

    const [ { initial, upvoted, downvoted }, setVote ] = useState<{ upvoted: boolean, downvoted: boolean, initial: number }>( {
        downvoted: false,
        initial: 0,
        upvoted: false
    } )

    return (
        <div className={ styles.action_item_wrap }>
            <Upvote setVote={ setVote } votes={ 0 }/>
            {/* { !votes ? "" : formatter.format( votes ) } */}
            { initial }
            <Downvote setVote={ setVote } votes={ 0 }/>
        </div>
    )
}

export default Vote