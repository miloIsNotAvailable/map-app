import { FC } from "react";
import { usePostsProvider } from "../../../contexts/PostsContext";
import { ContextType } from "../../../interfaces/ContextTypes";
import Fallback from "../../assets/Fallback";
import { styles } from "../build/CommunityStyles";

const CommunityName: FC = () => {

    const { data, isLoading } = usePostsProvider<ContextType>()

    if( isLoading ) return (
        <div className={ styles.community_name_wrap }>
            <div className="icon"/>
            <Fallback width="6rem" height="var(--font-size)"/>
        </div>
    )

    return (
    <div className={ styles.community_name_wrap }>
        <div className="icon"/>
        <div>{ data?.queryPosts[0]?.name }</div>
    </div>
    )
}

export default CommunityName