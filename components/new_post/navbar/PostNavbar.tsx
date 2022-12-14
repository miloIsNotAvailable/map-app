import { FC, lazy, Suspense } from "react";
import Fallback from "../../assets/Fallback";
import { styles } from "../build/PostStyles";
import Cancel from "./Cancel";
// import Submit from "./Submit";
const Submit = lazy( () => import( "./Submit" ) ) 

const PostNavbar: FC = () => {

    return (
        <div className={ styles.navbar_wrap }>
            <Suspense fallback={ 
                <Fallback
                    width = 'calc( 6ch + 4rem )'
                    height = "calc( var(--font-size) + 1rem )"
                />
             }>
                <Submit/>
            </Suspense>
            <Cancel/>
        </div>
    )
}

export default PostNavbar