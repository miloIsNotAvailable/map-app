import { ChangeEvent, FC } from "react";
import { useRedux } from "../../../../hooks/useRedux";
import { addDesc } from "../../../../redux/inputs/createCommunitySlice";
import { styles } from "../../build/CreateStyes";

const Description: FC = () => {

    const [ selector, dispatch ] = useRedux()

    const handleChange: ( e: ChangeEvent<HTMLTextAreaElement> ) => void 
    = ( e ) => {
        dispatch( addDesc( {
            desc: e.target.value
        } ) )
    }

    return <textarea
        className={ styles.inputs }
        placeholder={ "short description" }
        onChange={ handleChange }
    />
}

export default Description