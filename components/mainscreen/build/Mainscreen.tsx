import { FC } from "react";
import Navbar from "../navbar/build/Navbar";
import { styles } from "./MainscreenStyles";

const Mainscreen: FC = () => {

    return (
        <div className={ styles.mainscreen_wrap }>
            <Navbar/>
        </div>
    )
}

export default Mainscreen