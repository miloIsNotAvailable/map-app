import { FC } from "react";
import { styles } from "../build/CommentStyles";

const CommentLayout: FC = () => {

    return (
        <div className={ styles.comment_wrap }>
            <div className="icon"/>
            <div className={ styles.comment_contents }>
                lorem ipsum dolorem sit amet
            </div>
        </div>
    )
}

export default CommentLayout