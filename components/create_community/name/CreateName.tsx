import { FC } from "react";
import Form from "../../assets/Form";
import { styles } from "../build/CreateStyes";
import CommunityIcon from "./CommunityIcon";

const CreateName: FC = () => {

    return (
        <div className={ styles.create_name }>
            <CommunityIcon/>
            <Form
                placeholder={ "community name" }
            />
        </div>
    )
}

export default CreateName