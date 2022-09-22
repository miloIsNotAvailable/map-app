import { FC, useState } from "react";
import Icon from "../../../Icon";
import { default as UpvoteIcon } from '../../../../../graphics/icons/upvote.svg'
import { useRedux } from "../../../../../hooks/useRedux";
import { getVotes } from "../../../../../redux/postActions/postActionsSlice";

interface UpvoteProps {
    setVote: React.Dispatch<React.SetStateAction<{
        upvoted: boolean;
        downvoted: boolean;
        initial: number;
    }>>,
    votes: number
}

const Upvote: FC<UpvoteProps> = ( { setVote, votes } ) => {

    const [ , dispatch] = useRedux()
    const [ upvoted, setUpvoted ] = useState( false )

    const handleUpvote: () => void = () => {
        
        setUpvoted( !upvoted )

        setVote( ( { initial } ) => ({
            initial: !upvoted ? initial + 1 : votes,
            downvoted: false,
            upvoted
        }) ) 
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