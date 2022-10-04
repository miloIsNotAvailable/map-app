import { FC } from "react";
import { usePostsProvider } from "../../../contexts/PostsContext";
import { ContextType } from "../../../interfaces/ContextTypes";
import Fallback from "../../assets/Fallback";
import { styles } from "../build/CommunityStyles";

const Desc: FC = () => {

    const { data, isLoading } = usePostsProvider<ContextType>()

    if( isLoading ) return (
        <div className={ styles.desc }>
            <div className={ styles.desc_title }>
                short description
            </div>
            <div className={ styles.desc_details }>
                <Fallback width="6rem" height="var(--font-size)"/>
            </div>
        </div>    
    )

    return (
        <div className={ styles.desc }>
            <div className={ styles.desc_title }>
                short description
            </div>
            <div className={ styles.desc_details }>
                { data?.queryPosts[0]?.description }
            </div>
        </div>
    )
}

export default Desc