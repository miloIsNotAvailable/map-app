import { FC } from "react";
import { Comments, Responses } from "../../../db/orm/dbinterfaces";
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";
import { default as RespondIcon } from '../../../graphics/icons/respond.svg'
import { useRedux } from "../../../hooks/useRedux";
import { isResponse } from "../../../redux/commentTypes/CommentTypes";
import { useResponsesQuery } from "../../../redux/api/fetchApi";

interface ResponseProps {
    // arr: (Comments & { responses?: Comments[] | null })[]
    response_id: string
}

const QUERY_RESPONSES = `
query QueryResponses( $comment_id: String, $post_id: String ){
    responses( comment_id: $comment_id, post_id: $post_id ){
      content
      post_id
      responses
          comment_id
      response_id
    }
  }`

const Response: FC<ResponseProps> = ( { response_id } ) => {

    const [ , dispatch ] = useRedux()

    const handleDispatchResponse: () => void = () => {
        dispatch( isResponse( {
            responses: true,
        } ) )
    }

    const { data, isLoading } = useResponsesQuery( {
        body: QUERY_RESPONSES,
        variables: { comment_id: response_id }
    } )

    console.log( data?.responses )

    if ( !data?.responses.length ) return <></>

    return (
        <div className={ styles.nested_response }>
            {
                data?.responses && data?.responses.map( ( { comment_id, response_id, content } ) => (
                    <div 
                        className={ styles.response }
                        // style={ { height: `calc( ${ responses?.length } * 3rem + 3rem )` } }
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
                                <Response response_id={ response_id }/>
                            </div>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
}

export default Response