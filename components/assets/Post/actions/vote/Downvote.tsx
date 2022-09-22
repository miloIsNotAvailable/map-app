import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as DownvoteIcon } from '../../../../../graphics/icons/downvote.svg'
import { useRedux } from "../../../../../hooks/useRedux";
import { getVotes } from "../../../../../redux/postActions/postActionsSlice";

interface DownvoteProps {
    setVote: React.Dispatch<React.SetStateAction<{
        upvoted: boolean;
        downvoted: boolean;
        initial: number;
    }>>
    votes: number
}


const Downvote: FC<DownvoteProps> = ( { setVote, votes } ) => {

    const [ , dispatch] = useRedux()
    const [ downvoted, setDownvoted ] = useState( false )

    const handleUpvote: () => void = () => {
        
        setDownvoted( !downvoted )

        setVote( ( { initial } ) => ({
            initial: !downvoted ? initial - 1: votes,
            upvoted: false,
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