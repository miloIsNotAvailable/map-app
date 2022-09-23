import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as DownvoteIcon } from '../../../../../graphics/icons/downvote.svg'
import { useRedux } from "../../../../../hooks/useRedux";
import { getVotes } from "../../../../../redux/postActions/postActionsSlice";
import { actionType } from "../../../../../interfaces/ComponentTypes";
import { useUpdateVotesMutation } from "../../../../../redux/api/fetchApi";
import { useActionsProvider } from "../../../../../contexts/ActionsContext";

interface DownvoteProps {
    setVote: React.Dispatch<actionType>
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

const Downvote: FC<DownvoteProps> = ( { setVote, votes } ) => {

    const [ , dispatch] = useRedux()
    const [ downvoted, setDownvoted ] = useState( false )
    
    const [ updateVotes, { data, isLoading } ] = useUpdateVotesMutation()
    const { post_id } = useActionsProvider()

    const handleUpvote: () => void = () => {
        
        setDownvoted( !downvoted )

        updateVotes( {
            body: UPDATE_QUERY,
            variables: {
                post_id, 
                upvoted: false,
                downvoted: !downvoted
            }
        } )

        // setVote( ( {
        //     votes,
        //     upvoted: true,
        //     downvoted,
        // }) )
    }

    return (
        <Icon 
        style={ {
            width: 'calc(var(--icon-size) - .5rem)',
            height: 'calc(var(--icon-size) - .5rem)',
            opacity: `${ downvoted ? 1 : .5 }`
        } } 
        onClick={ handleUpvote }
        iconPath={ DownvoteIcon }/>
    )
}

export default Downvote