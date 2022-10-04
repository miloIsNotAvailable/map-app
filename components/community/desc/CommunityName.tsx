import { FC } from "react";
import { styles } from "../build/CommunityStyles";

const CommunityName: FC = () => {

    return (
    <div className={ styles.community_name_wrap }>
        <div className="icon"/>
        <div>community_name</div>
    </div>
    )
}

export default CommunityName