import { FC } from "react";
import { authContext, useAuthContext } from "../../../contexts/AuthContext";
import { useSubmitContext } from "../../../contexts/SubmitContext";
import { styles } from "./SubmitStyles";

const Submit: FC = () => {

    const { isLoading, data } = useAuthContext()
    const { onSubmit, isLoading: submitting } = useSubmitContext()

    return (
        <button 
            onClick={ ( e ) => onSubmit<typeof e>( e ) }
            className={ styles.submit }
            disabled={ isLoading || !data?.user?.id }
        >
            <p
                style={ { 
                    animation: `${ submitting && "spin 1s ease infinite" }` ,
                    transition: 'all 200ms ease'
                } }
            >
                { submitting ? "⏳" : "submit" }
            </p>
        </button>
    )
}

export default Submit