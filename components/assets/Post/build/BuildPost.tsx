import { AnimatePresence, useInView } from "framer-motion";
import { FC, lazy, Suspense, useEffect, useRef } from "react";
import { usePostsProvider } from "../../../../contexts/PostsContext";
import Fallback from "../../Fallback";
import { styles } from "./PostStyles";
import { motion } from "framer-motion";
import Actions from "../actions";
import { ActionsContext } from "../../../../contexts/ActionsContext";
import { ContextType } from "../../../../interfaces/ContextTypes";
import PostType from "../type/PostType";

const PostedBy =  lazy( () => import("../author/postedBy"));
const Navbar =  lazy( () => import("../navbar/Navbar"));
const TextPost =  lazy( () => import("../type/textPost"));

const BuildPost: FC = () => {

    const ref = useRef<HTMLDivElement | null>( null )

    const { data, isLoading } = usePostsProvider<ContextType>()

    console.log( data, isLoading )

    if( isLoading ) return (
        <AnimatePresence mode="wait">
            <motion.div 
                ref={ref} 
                key={"loading"}
                className={ styles.post_wrap }
                initial={ { opacity: 0, transform: 'translate(-100%, 0%)' } }
                animate={ { opacity: 1, transform: 'translate(0%, 0%)' } }
                exit={ { opacity: 0, transform: 'translate(100%, 0%)' } }
            >
                <div className={ styles.post_border }>
                    <Fallback width="6rem"/>
                    <Fallback width="6rem"/>
                    <Fallback margin="auto" width="calc(100% - 2rem)" height="calc(100% - 2rem)"/>
                </div>
            </motion.div>
        </AnimatePresence>
    ) 

    return(
        <>
        { data?.queryPosts.map( ( { post_id, content, community_id, user_id, type }, ind ) => (
        <div className={ styles.post_navbar_wrap }>
            <motion.div 
                ref={ref} 
                className={ styles.post_wrap } 
                key={ post_id }
                initial={ { opacity: 0, transform: 'translate(-100%, 0%)' } }
                animate={ { opacity: 1, transform: 'translate(0%, 0%)' } }
                exit={ { opacity: 0, transform: 'translate(100%, 0%)' } }
            >
                <div className={ styles.post_border }>
                    <Suspense fallback={ <Fallback width="6rem"/> }>
                        <Navbar community_id={ community_id! }/>
                    </Suspense>
                    <Suspense fallback={<Fallback width="6rem"/>}>
                        <PostedBy id={ user_id! }/>
                    </Suspense>
                    <Suspense fallback={ <Fallback margin="auto" width="calc(100% - 2rem)" height="calc(100% - 2rem)"/> }>
                        <PostType type={ type } content={ content! }/>
                    </Suspense>
                </div>
            </motion.div>
            {/* <ActionsContext value={ { post_id: post_id!, votes: 0 } }> */}
                <Actions post_id={ post_id! } votes={ 0 }/>
            {/* </ActionsContext> */}
        </div>
        ) ) }
        </>
    )
}

export default BuildPost