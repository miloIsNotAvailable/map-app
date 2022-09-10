import { ChangeEvent, FC } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { addName } from "../../../redux/inputs/createCommunitySlice";
import Form from "../../assets/Form";
import { styles } from "../build/CreateStyes";
import CommunityIcon from "./CommunityIcon";

const CreateName: FC = () => {

    const [ selector, dispatch ] = useRedux()

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => { 
        dispatch( addName( {
            name: e.target.value
        } ) ) 
    }

    return (
        <div className={ styles.create_name }>
            <CommunityIcon/>
            <Form
                placeholder={ "community name" }
                onChange={ handleChange }
            />
        </div>
    )
}

export default CreateName