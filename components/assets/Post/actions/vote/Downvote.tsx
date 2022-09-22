import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as DownvoteIcon } from '../../../../../graphics/icons/downvote.svg'
import { useRedux } from "../../../../../hooks/useRedux";
import { getVotes } from "../../../../../redux/postActions/postActionsSlice";
import { actionType } from "../../../../../interfaces/ComponentTypes";

interface DownvoteProps {
    setVote: React.Dispatch<actionType>
    votes: number
}

const Downvote: FC<DownvoteProps> = ( { setVote, votes } ) => {

    const [ , dispatch] = useRedux()
    const [ downvoted, setDownvoted ] = useState( false )

    const handleUpvote: () => void = () => {
        
        setDownvoted( !downvoted )

        setVote( ( {
            votes,
            upvoted: true,
            downvoted,
        }) )
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