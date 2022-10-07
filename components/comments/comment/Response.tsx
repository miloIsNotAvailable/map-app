import { FC } from "react";
import { Comments } from "../../../db/orm/dbinterfaces";
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";
import { default as RespondIcon } from '../../../graphics/icons/respond.svg'
import { useRedux } from "../../../hooks/useRedux";
import { isResponse } from "../../../redux/commentTypes/CommentTypes";

interface ResponseProps {
    // arr: (Comments & { responses?: Comments[] | null })[]
    arr: any[]
}

const Response: FC<ResponseProps> = ( { arr } ) => {

    const [ , dispatch ] = useRedux()

    const handleDispatchResponse: () => void = () => {
        dispatch( isResponse( {
            responses: true,
        } ) )
    }

    if ( !arr.length ) return <></>

    return (
        <div className={ styles.nested_response }>
            {
                arr && arr.map( ( { responses, content } ) => (
                    <div 
                        className={ styles.response }
                        style={ { height: `calc( ${ responses?.length } * 3rem + 3rem )` } }
                    >
                        <div className={ styles.response_branch }/>
                        <div className={ styles.response_wrap }>
                            <div className={ styles.respond_user }>
                                <CommentLayout content={ content }/>
                                <Icon 
                                    iconPath={ RespondIcon }
                                    onClick={ handleDispatchResponse }
                                />
                            </div>
                            <div className={ styles.response_wrap }>
                                {responses && <Response arr={ responses }/>}
                            </div>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
}

export default Response