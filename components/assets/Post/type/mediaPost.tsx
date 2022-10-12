import { FC } from "react";
import { styles } from "../build/PostStyles";

interface MediaPostProps {
    content: string
}

const MediaPost: FC<MediaPostProps> = ( { content } ) => {

    return (
        <a 
            href={ content } 
            className={ styles.media_post }
            referrerPolicy={ "no-referrer" }
            target={ "_blank" } 
        >
            <img src={ content } className={ styles.media_post }/>
        </a>
    )
}

export default MediaPost