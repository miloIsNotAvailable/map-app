import { FC } from "react";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import { styles } from "./CreateStyes";
import Navbar from "../../mainscreen/navbar";
import CreateName from "../name/CreateName";

const CreateCommunity: FC = () => {

    return (
        <div className={ styles.create_wrap }>
            <NavbarTop/>
            <CreateName/>
            <Navbar/>
        </div>
    )
}

export default CreateCommunity