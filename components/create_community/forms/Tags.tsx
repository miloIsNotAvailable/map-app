import { FC } from "react";
import { styles } from "../build/CreateStyes";

const Tags: FC = () => {

    return (
        <div className={ styles.add_tags_wrap }>
            <input
                className={ styles.inputs }
                placeholder={ "tags" }
            />
            <div className={ styles.add_tags }>
                {"+"}
            </div>
        </div>
    )
}

export default Tags