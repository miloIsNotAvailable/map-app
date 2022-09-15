import { ChangeEvent, FC } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { getCommunity } from "../../../redux/inputs/postInputSlice";
import { styles } from './PostInputStyles'

const AddCommunity: FC = () => {

    const [ selector, dispatch ] = useRedux()

    const handleChange: 
    ( e: ChangeEvent<HTMLInputElement> ) => Promise<void> = async e => {

        // const [ selector, dispatch ] = (await import( "../../../hooks/useRedux" )).useRedux()

        dispatch( getCommunity( {
            community: e.target.value
        } ) )
    }

    return (
        <div className={ styles.wrap_community_input }>
            <div className={ styles.icon }/>
            <input
                placeholder={ "+" }
                className={ styles.add_community_input }
                onChange={ handleChange }
            />
        </div>
    )
}

export default AddCommunity