import { FC } from "react";
import MapIcons from "./mapIcons";
import { styles } from "./NavbarStyles";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar }>
            <MapIcons/>
        </div>
    )
}

export default Navbar