import { FC } from "react";
import { styles } from "../../build/PostStyles";
import Comments from "../comments/Comments";
import Repost from "../repost/Repost";
import Share from "../share/Share";
import Vote from "../vote/Vote";

interface ActionsProps {
    post_id: string
    votes: number
}

const Actions: FC<ActionsProps> = ( { post_id, votes } ) => {

    return (
        <div className={ styles.actions }>
            <Vote votes={ votes } post_id={ post_id }/>
            <Comments/>
            <Share/>
            <Repost/>
        </div>
    )
}

export default Actions