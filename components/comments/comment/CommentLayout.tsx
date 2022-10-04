import { FC } from "react";
import { styles } from "../build/CommentStyles";

interface CommentLayoutProps {
    content: string
}

const CommentLayout: FC<CommentLayoutProps> = ( { content } ) => {

    return (
        <div className={ styles.comment_wrap }>
            <div className="icon"/>
            <div className={ styles.comment_contents }>
                { content }
            </div>
        </div>
    )
}

export default CommentLayout