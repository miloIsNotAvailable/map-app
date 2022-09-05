import { FC } from "react";
import { styles } from "../build/PostStyles";
import { postInputTypeState } from '../../../interfaces/reduxInterfaces'

const TextInput: FC = () => {

    return (
        <textarea 
            className={ styles.post_input_form }
            placeholder={ "post content" }
        />
    )
}

export default TextInput