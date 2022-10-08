import { FC } from "react";
import { useRedux } from "../../../hooks/useRedux";
import { isResponse } from "../../../redux/commentTypes/CommentTypes";
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";
import { default as RespondIcon } from '../../../graphics/icons/respond.svg'
import Fallback from "../../assets/Fallback";

interface RespondToProps {
    response_id: string
    isLoading: boolean
}

const RespondTo: FC<RespondToProps> = ( { response_id, isLoading } ) => {

    const [ , dispatch ] = useRedux()

    const handleDispatchResponse: ( response_id: string ) => void = response_id => {
        dispatch( isResponse( {
            responses: true,
            response_id
        } ) )
    }

    if( isLoading ) return (
      <div className={styles.icon}>
        <Fallback
          width={ "100%" }
          height={ "100%" }
          margin={ 0 }
        />
      </div>
    )

    return (
      <div className={styles.icon}>
        <Icon
          iconPath={ RespondIcon }
          onClick={() => handleDispatchResponse(response_id)}
        />
      </div>
    );
}

export default RespondTo