import { FC, lazy, Suspense } from "react";
import Fallback from "../../assets/Fallback";
import { styles } from "./SubmitStyles";
import Cancel from "./Cancel";
import { SubmitContext } from "../../../contexts/SubmitContext";
import { submitContextType } from "../../../interfaces/ContextTypes";
// import Submit from "./Submit";
const Submit = lazy( () => import( "./Submit" ) ) 

const PostNavbar: FC<submitContextType> = ( {
    onCancel,
    onSubmit
} ) => {

    return (
        <SubmitContext value={ { onCancel, onSubmit } }>
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
        </SubmitContext>
    )
}

export default PostNavbar