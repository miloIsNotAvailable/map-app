import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as UpvoteIcon } from '../../../../../graphics/icons/upvote.svg'
import { useRedux } from "../../../../../hooks/useRedux";
import { getVotes } from "../../../../../redux/postActions/postActionsSlice";
import { actionType } from "../../../../../interfaces/ComponentTypes";
import { useUpdateVotesMutation } from "../../../../../redux/api/fetchApi";
import { useActionsProvider } from "../../../../../contexts/ActionsContext";

interface UpvoteProps {
    setVote: React.Dispatch<actionType>,
    votes: number
}

const UPDATE_QUERY = `
mutation updateVotes($upvoted: Boolean, $downvoted: Boolean, $post_id: String) {
    updateVotes(upvoted: $upvoted, downvoted: $downvoted, post_id: $post_id) {
      upvoted
      downvoted
      post_id
    }
  }`

const Upvote: FC<UpvoteProps> = ( { setVote, votes } ) => {

    const [ upvoted, setUpvoted ] = useState( false )
    const [ updateVotes, { data, isLoading } ] = useUpdateVotesMutation()
    const { post_id } = useActionsProvider()

    const handleUpvote: () => void = () => {
        
        setUpvoted( !upvoted )

        updateVotes( {
            body: UPDATE_QUERY,
            variables: {
                post_id, 
                upvoted: !upvoted,
                downvoted: false
            }
        } )

        // setVote( ( {
        //     votes,
        //     downvoted: true,
        //     upvoted
        // }) )
    }

    return (
        <Icon 
        style={ {
            width: 'calc(var(--icon-size) - .5rem)',
            height: 'calc(var(--icon-size) - .5rem)',
            opacity: `${ upvoted ? 1 : .5 }`
        } } 
        onClick={ handleUpvote }
        iconPath={ UpvoteIcon }/>
    )
}

export default Upvote