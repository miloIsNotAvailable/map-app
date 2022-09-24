import { FC } from "react";
import { ActionsContext } from "../../../../../contexts/ActionsContext";
import { useVotesQuery } from "../../../../../redux/api/fetchApi";
import { styles } from "../../build/PostStyles";
import Comments from "../comments/Comments";
import Repost from "../repost/Repost";
import Share from "../share/Share";
import Vote from "../vote/Vote";

interface ActionsProps {
    post_id: string
    votes: number
}

const VOTES_QUERY = `
query Votes($post_id:String){
    votes(post_id:$post_id){
      upvoted
      downvoted
      post_id
      _count
    }
  }`

const Actions: FC<ActionsProps> = ( { post_id, votes } ) => {

    const { data, isLoading, error } = useVotesQuery( {
        body: VOTES_QUERY,
        variables: { post_id: post_id }
    } )

    return (
        <ActionsContext value={ { data, isLoading } }>
            <div className={ styles.actions }>
                <Vote votes={ votes } post_id={ post_id }/>
                <Comments/>
                <Share/>
                <Repost/>
            </div>
        </ActionsContext>
    )
}

export default Actions