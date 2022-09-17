import { FC } from "react";
import { styles } from "../build/PostStyles";
import CommunityName from "./CommunityName";
import Icon from "./Icon";

const Navbar: FC = () => {

    return (
        <div className={ styles.post_navbar }>
            <Icon/>
            <CommunityName/>
        </div>
    )
}

export default Navbar