import { FC, useCallback, useEffect, useReducer, useState } from "react";
import { useDebounce } from "../../../../../hooks/useDebounce";
import { useRedux } from "../../../../../hooks/useRedux";
import { actionType, votesType } from "../../../../../interfaces/ComponentTypes";
import { postActionsState } from "../../../../../interfaces/reduxInterfaces";
import { useUpdateVotesMutation } from "../../../../../redux/api/fetchApi";
import { styles } from "../../build/PostStyles";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

interface VoteProps {
    votes: number
    post_id: string
}

const UPDATE_VOTES = `
mutation updateVotes( $votes:Int, $post_id: String ){
  updateVotes( votes: $votes, post_id: $post_id){
    votes
    post_id
  
  }
}`

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

const Vote: FC<VoteProps> = ( { votes, post_id } ) => {

    const [ { votes: vote }, dispatch ] = useReducer( reducer, { votes } )
    const [ updateVotes, { data, isLoading } ] = useUpdateVotesMutation()

    const handleVote = ( v: typeof vote ) => {
        updateVotes( {
            body: UPDATE_VOTES,
            variables: { votes: v, post_id }
        } )
    }

    const debounce = useDebounce()
    const v = useCallback( debounce( handleVote, 1000 ), [] )

    useEffect( () => {
        
        v( vote )
        // console.log( vote )
    }, [ vote ] )

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