import { FC } from "react";
import { useSubmitContext } from "../../../contexts/SubmitContext";

const Cancel: FC = () => {
    
    const { onCancel } = useSubmitContext()

    return (
        <button
            onClick={ e => onCancel<typeof e>( e ) }
        >
            cancel
        </button>
    )
}

export default Cancel