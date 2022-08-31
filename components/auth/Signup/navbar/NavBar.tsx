import { FC } from "react";
import { styles } from "../build/LoginStyles";
import Reroute from "./Reroute";
import Submit from "./Submit";

const NavBar: FC = () => {

    return (
        <div className={ styles.navbar_wrap }>
            <Submit/>
            <Reroute link={ "/" }>
                { "login" }
            </Reroute>
        </div>
    )
}

export default NavBar