import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as DownvoteIcon } from '../../../../../graphics/icons/downvote.svg'
import { useUpdateVotesMutation } from "../../../../../redux/api/fetchApi";
import { useActionsProvider } from "../../../../../contexts/ActionsContext";

interface DownvoteProps {

}

const UPDATE_QUERY = `
mutation updateVotes($upvoted: Boolean, $downvoted: Boolean, $post_id: String) {
    updateVotes(upvoted: $upvoted, downvoted: $downvoted, post_id: $post_id) {
      upvoted
      downvoted
      post_id
    }
  }`

const Downvote: FC<DownvoteProps> = ( ) => {

    const { data } = useActionsProvider()
    const [ downvoted, setDownvoted ] = useState( data?.votes?.downvoted || false )
    
    const [ updateVotes, { data: updateData, isLoading } ] = useUpdateVotesMutation()

    const handleUpvote: () => Promise<void> = async() => {
        
        setDownvoted( !downvoted )

        await updateVotes( {
            body: UPDATE_QUERY,
            variables: {
                post_id: data?.votes?.post_id, 
                upvoted: false,
                downvoted: downvoted
            }
        } )
    }

    return (
        <Icon 
        style={ {
            width: 'calc(var(--icon-size) - .5rem)',
            height: 'calc(var(--icon-size) - .5rem)',
            opacity: `${ data?.votes?.downvoted ? 1 : .5 }`
        } } 
        onClick={ handleUpvote }
        iconPath={ DownvoteIcon }/>
    )
}

export default Downvote