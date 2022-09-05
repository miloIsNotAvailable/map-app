import { FC } from "react";
import { styles } from "../build/PostStyles";

const MediaInput: FC = () => {

    return (
        <div className={ `${ styles.post_input_form } ${ styles.media_wrap }` }>
            { "+ \nadd file" }
            <input type={ "file" } className={ styles.media }/>
        </div>
    )
}

export default MediaInput