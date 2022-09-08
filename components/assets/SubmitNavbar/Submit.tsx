import { FC } from "react";
import { authContext, useAuthContext } from "../../../contexts/AuthContext";
import { useSubmitContext } from "../../../contexts/SubmitContext";
import { styles } from "./SubmitStyles";

const Submit: FC = () => {

    const { isLoading, data } = useAuthContext()
    const { onSubmit } = useSubmitContext()

    return (
        <button 
            onClick={ ( e ) => onSubmit<typeof e>( e ) }
            className={ styles.submit }
            disabled={ isLoading || !data?.user?.id }
        >
            submit
        </button>
    )
}

export default Submit