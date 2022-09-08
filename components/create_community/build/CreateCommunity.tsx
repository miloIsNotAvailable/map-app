import { FC } from "react";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import { styles } from "./CreateStyes";
import Navbar from "../../mainscreen/navbar";
import CreateName from "../name/CreateName";
import Description from "../forms/Description";
import Tags from "../forms/Tags";

const CreateCommunity: FC = () => {

    return (
        <div className={ styles.create_wrap }>
            <NavbarTop/>
            <CreateName/>
            <div className={ styles.input_wrap }>
                <Description/>
                <Tags/>
            </div>
            <Navbar/>
        </div>
    )
}

export default CreateCommunity