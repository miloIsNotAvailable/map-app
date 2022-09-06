import { FC } from "react";
import { authContext, useAuthContext } from "../../../contexts/AuthContext";
import { styles } from "../build/PostStyles";

const Submit: FC = () => {

    const { isLoading, data } = useAuthContext()

    return (
        <button 
            className={ styles.submit }
            disabled={ isLoading || !data?.user?.id }
        >
            submit
        </button>
    )
}

export default Submit