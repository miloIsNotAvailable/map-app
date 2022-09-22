import { FC, useEffect, useReducer, useState } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { actionType, votesType } from "../../../../../interfaces/ComponentTypes";
import { postActionsState } from "../../../../../interfaces/reduxInterfaces";
import { styles } from "../../build/PostStyles";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

interface VoteProps {
    votes: number
}

const reducer = ( 
    state: votesType, 
    action: actionType 
): votesType => {

    state.votes = action.votes

    if( !action.upvoted ) {
        return { votes: state.votes + 1 }
    }
    
    if( !action.downvoted ) {
        return { votes: state.votes - 1 } 
    }
    
    return { votes: action.votes } 
}

const Vote: FC<VoteProps> = ( { votes } ) => {

    const [ { votes: vote }, dispatch ] = useReducer( reducer, { votes } )

    const formatter= Intl.NumberFormat( 'en', { notation: "compact", compactDisplay: "short" } )

    return (
        <div className={ styles.action_item_wrap }>
            <Upvote setVote={ dispatch } votes={ votes }/>
            { formatter.format( vote ) }
            <Downvote setVote={ dispatch } votes={ votes }/>
        </div>
    )
}

export default Vote