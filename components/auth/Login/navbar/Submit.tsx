import { FC } from "react";
import { useLoginWithCredentials } from "../../../../hooks/loginWithCredentials";

const Submit: FC = () => {

    const [ getToken, { data, isLoading } ] = useLoginWithCredentials()

    const onClick: () => void = () => {
        getToken()
    }

    return (
        <button onClick={ onClick }>
            LOGIN
        </button>
    )
}

export default Submit