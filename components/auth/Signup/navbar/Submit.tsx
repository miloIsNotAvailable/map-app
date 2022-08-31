import { FC } from "react";
import { useLoginWithCredentials } from "../../../../hooks/loginWithCredentials";
import { userDataState } from "../../../../interfaces/reduxInterfaces";
import { useAppSelector } from "../../../../redux/hooks";

const Submit: FC = () => {

    const [ getToken, { data, isLoading } ] = useLoginWithCredentials()
    const selector = useAppSelector( ( state: userDataState ) => state.userData.error )

    const onClick: () => void = () => {
        getToken()
    }

    return (
        <button 
            onClick={ onClick }
            disabled={ !!selector?.email || !!selector?.username || !!selector?.password }
        >
            submit
        </button>
    )
}

export default Submit