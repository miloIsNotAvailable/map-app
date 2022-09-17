import { FC } from "react";
import PostedBy from "../author/postedBy";
import Navbar from "../navbar/Navbar";
import TextPost from "../type/textPost";
import { styles } from "./PostStyles";

const BuildPost: FC = () => {

    return(
        <div className={ styles.post_wrap }>
            <div className={ styles.post_border }>
                <Navbar/>
                <PostedBy/>
                <TextPost/>
            </div>
        </div>
    )
}

export default BuildPost