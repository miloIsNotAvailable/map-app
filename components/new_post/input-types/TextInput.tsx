import { ChangeEvent, FC } from "react";
import { styles } from "../build/PostStyles";
import { postInputTypeState } from '../../../interfaces/reduxInterfaces'
import { useRedux } from "../../../hooks/useRedux";
import { getContent } from "../../../redux/inputs/postInputSlice";

const TextInput: FC = () => {

    const [ selector, dispatch ] = useRedux()

    const handleChange: 
    ( e: ChangeEvent<HTMLTextAreaElement> ) => void 
    = e => {
        dispatch( 
            getContent( {
                content: e.target.value
            } )
         )
    }

    return (
        <textarea 
            className={ styles.post_input_form }
            placeholder={ "post content" }
            onChange={ handleChange }
        />
    )
}

export default TextInput