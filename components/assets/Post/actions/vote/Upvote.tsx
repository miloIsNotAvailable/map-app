import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as UpvoteIcon } from '../../../../../graphics/icons/upvote.svg'
import { useUpdateVotesMutation } from "../../../../../redux/api/fetchApi";
import { useActionsProvider } from "../../../../../contexts/ActionsContext";

interface UpvoteProps {
}

const UPDATE_QUERY = `
mutation updateVotes($upvoted: Boolean, $downvoted: Boolean, $post_id: String) {
    updateVotes(upvoted: $upvoted, downvoted: $downvoted, post_id: $post_id) {
      upvoted
      downvoted
      post_id
    }
  }`

const Upvote: FC<UpvoteProps> = (  ) => {

    const { data } = useActionsProvider()
    
    const [ upvoted, setUpvoted ] = useState( data?.votes?.upvoted || false )
    const [ updateVotes, { data: updateData, isLoading } ] = useUpdateVotesMutation()

    const handleUpvote: () => void = () => {
        
        setUpvoted( !upvoted )

        updateVotes( {
            body: UPDATE_QUERY,
            variables: {
                post_id: data?.votes?.post_id, 
                upvoted: !upvoted,
                downvoted: false
            }
        } )
    }

    return (
        <Icon 
        style={ {
            width: 'calc(var(--icon-size) - .5rem)',
            height: 'calc(var(--icon-size) - .5rem)',
            opacity: `${ data?.votes?.upvoted ? 1 : .5 }`
        } } 
        onClick={ handleUpvote }
        iconPath={ UpvoteIcon }/>
    )
}

export default Upvote