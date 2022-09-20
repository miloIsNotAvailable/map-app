import { FC } from "react";
import { styles } from "../build/PostStyles";

interface TextPostProps {
    content: string
}

const TextPost: FC<TextPostProps> = ( { content } ) => {

    return (
        <div className={ styles.text_post }>
            { content }
        </div>
    )
}

export default TextPost