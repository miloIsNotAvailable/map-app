import { FC, lazy } from "react";
import { default as Add } from '../../../graphics/icons/create_community.svg'
import { styles } from "../build/CreateStyes";

const CommunityIcon: FC = () => {

    return (
        <div className={ styles.icon_wrap }>
            <div className={ styles.default_icon }></div>
            <img src={ Add }/>
        </div>
    )
}

export default CommunityIcon