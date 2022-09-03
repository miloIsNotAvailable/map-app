import { FC } from "react";
import Navbar from "../navbar/build/Navbar";
import NavbarTop from "../navbar/NavbarTop";
import { styles } from "./MainscreenStyles";

const Mainscreen: FC = () => {

    return (
        <div className={ styles.mainscreen_wrap }>
            <NavbarTop/>
            <Navbar/>
        </div>
    )
}

export default Mainscreen