import { useInView } from "framer-motion";
import { FC, lazy, Suspense, useEffect, useRef } from "react";
import { usePostsProvider } from "../../../../contexts/PostsContext";
import Fallback from "../../Fallback";
import { styles } from "./PostStyles";

const PostedBy =  lazy( () => import("../author/postedBy"));
const Navbar =  lazy( () => import("../navbar/Navbar"));
const TextPost =  lazy( () => import("../type/textPost"));

const BuildPost: FC = () => {

    const ref = useRef<HTMLDivElement | null>( null )

    const { data, isLoading } = usePostsProvider()

    console.log( data, isLoading )

    if( isLoading ) return (
        <div ref={ref} className={ styles.post_wrap }>
            <div className={ styles.post_border }>
                <Fallback width="6rem"/>
                <Fallback width="6rem"/>
                <Fallback margin="auto" width="calc(100% - 2rem)" height="calc(100% - 2rem)"/>
            </div>
        </div>
    ) 

    return(
        <>
        { data?.queryPosts.map( ( { post_id, content, community_id, user_id } ) => (
        <div 
            ref={ref} 
            className={ styles.post_wrap } 
            key={ post_id }
        >
            <div className={ styles.post_border }>
                <Suspense fallback={ <Fallback width="6rem"/> }>
                    <Navbar community_id={ community_id! }/>
                </Suspense>
                <Suspense fallback={<Fallback width="6rem"/>}>
                    <PostedBy id={ user_id! }/>
                </Suspense>
                <Suspense fallback={ <Fallback margin="auto" width="calc(100% - 2rem)" height="calc(100% - 2rem)"/> }>
                    <TextPost content={ content! }/>
                </Suspense>
            </div>
        </div>
        ) ) }
        </>
    )
}

export default BuildPost