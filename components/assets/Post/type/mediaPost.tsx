import { FC } from "react";
import { styles } from "../build/PostStyles";

interface MediaPostProps {
    content: string
}

const MediaPost: FC<MediaPostProps> = ( { content } ) => {

    return (
        <img src={ content } className={ styles.media_post } />
    )
}

export default MediaPost