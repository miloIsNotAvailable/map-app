import { FC } from "react";
import { styles } from "../../build/PostStyles";
import Comments from "../comments/Comments";
import Repost from "../repost/Repost";
import Share from "../share/Share";
import Vote from "../vote/Vote";

const Actions: FC = () => {

    return (
        <div className={ styles.actions }>
            <Vote votes={ 1234556 }/>
            <Comments/>
            <Share/>
            <Repost/>
        </div>
    )
}

export default Actions