import { useInView } from "framer-motion";
import { FC, lazy, Suspense, useEffect, useRef } from "react";
import Fallback from "../../Fallback";
import { styles } from "./PostStyles";

const PostedBy =  lazy( () => import("../author/postedBy"));
const Navbar =  lazy( () => import("../navbar/Navbar"));
const TextPost =  lazy( () => import("../type/textPost"));

const BuildPost: FC = () => {

    const ref = useRef<HTMLDivElement | null>( null )

    return(
        <div ref={ref} className={ styles.post_wrap }>
            <div className={ styles.post_border }>
                <Suspense fallback={ <Fallback width="6rem"/> }>
                    <Navbar/>
                </Suspense>
                <Suspense fallback={<Fallback width="6rem"/>}>
                    <PostedBy/>
                </Suspense>
                <Suspense fallback={ <Fallback margin="auto" width="calc(100% - 2rem)" height="calc(100% - 2rem)"/> }>
                    <TextPost/>
                </Suspense>
            </div>
        </div>
    )
}

export default BuildPost