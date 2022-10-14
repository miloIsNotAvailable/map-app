import { createRef, FC, FormEvent, forwardRef, useRef } from "react";
import Form from "../../assets/Form";
import { default as SendIcon } from '../../../graphics/icons/submitComment.svg'
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";
import { useCreateCommentMutation, useCreateResponseMutation } from "../../../redux/api/fetchApi";
import { isConstructorDeclaration } from "typescript";
import { useRedux } from "../../../hooks/useRedux";
import { commentTypeState } from "../../../interfaces/reduxInterfaces";
import { isResponse } from "../../../redux/commentTypes/CommentTypes";

const CREATE_COMMENT = `
mutation createComment( $content: String, $post_id: String ){
    createComments( content: $content, post_id: $post_id ){
      content
      post_id
    }
  }`

const CREATE_RESPONSE = `
mutation createResponse($content: String, $response_id: String, $post_id: String, $comment_id: String) {
    createResponse(content: $content, response_id: $response_id, post_id: $post_id, comment_id: $comment_id) {
      content
      response_id
      post_id
      comment_id
    }
  }`

interface CommentInputProps {
    id: string
}

const CommentInput: FC<CommentInputProps> = ( { id } ) => {

    const [ createComment, { data, isLoading } ] = useCreateCommentMutation()
    const [ createResponse, {} ] = useCreateResponseMutation()
    
    const [ { commentType: response }, dispatch ] = useRedux<commentTypeState>()

    const ref = useRef<HTMLInputElement | null>( null )

    const handleSubmit: () => void = () => {
        if( !ref.current || !ref.current.value ) return

        if( response.responses ) {
            createResponse( {
                body: CREATE_RESPONSE,
                variables: {
                    post_id: id,
                    comment_id: response.response_id,
                    content: ref.current.value,
                }
            } )

            dispatch( isResponse( {
                responses: false,
                response_id: ""
            } ) )

            return
        }

        createComment( {
            body: CREATE_COMMENT,
            variables: {
                content: ref.current.value,
                post_id: id
            }
        } )
    }

    console.log( response )

    const dispatchToCommentOnBlur: () => void =() => {
        if( !response.responses ) return
        dispatch( isResponse( {
            responses: false,
            response_id: ""
        } ) )
    }

    return (
        <form className={ styles.comment_input }>
            {/* <Form id="inp" placeholder="leave a comment"/> */}
            <input 
                className={ styles.input } 
                placeholder={response.responses ? "leave a response" : "leave a comment"}
                ref={ ref }
                // onBlur={ dispatchToCommentOnBlur }
            />
            <Icon 
                iconPath={ SendIcon } 
                onClick={ handleSubmit } 
            />
        </form>
    )
}

export default CommentInput