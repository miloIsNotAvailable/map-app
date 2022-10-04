import { FC } from "react";
import { styles } from "../build/CommunityStyles";

const Desc: FC = () => {

    return (
        <div className={ styles.desc }>
            <div className={ styles.desc_title }>
                short description
            </div>
            <div className={ styles.desc_details }>
                lorem ipsum dolorem sit amet
            </div>
        </div>
    )
}

export default Desc