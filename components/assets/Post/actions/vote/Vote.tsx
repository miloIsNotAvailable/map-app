import { FC } from "react";
import { styles } from "../../build/PostStyles";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

interface VoteProps {
    votes: number
}

const Vote: FC<VoteProps> = ( { votes } ) => {

    const formatter = Intl.NumberFormat( 'en', { notation: 'compact' } )

    return (
        <div className={ styles.action_item_wrap }>
            <Upvote/>
            { !votes ? "" : formatter.format( votes ) }
            <Downvote/>
        </div>
    )
}

export default Vote