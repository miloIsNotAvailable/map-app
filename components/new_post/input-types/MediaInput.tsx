import { FC } from "react";
import { useOpenImage } from "../../../hooks/useOpenImage";
import { useRedux } from "../../../hooks/useRedux";
import { postInputTypeState } from "../../../interfaces/reduxInterfaces";
import { styles } from "../build/PostStyles";

const MediaInput: FC = ( ) => {

    const handleImage = useOpenImage()
    const [ { postInputType }, dispatch ] = useRedux<postInputTypeState>()

    if( postInputType?.content && postInputType.content.match(/(data\:image\/(png|jpg|jpeg);base64)/) ) return (
        <div className={ `${ styles.post_input_form }` }>
            <img 
                src={ postInputType.content }
                className={ styles.media_img }
            />
        </div>
    )

    return (
        <div className={ `${ styles.post_input_form } ${ styles.media_wrap }` }>
            { "+ \nadd file" }
            <input 
                type={ "file" } 
                className={ styles.media }
                onDrop={ handleImage }
                onChange={ handleImage }
            />
        </div>
    )
}

export default MediaInput