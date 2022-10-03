import { createRef, FC, FormEvent, forwardRef, useRef } from "react";
import Form from "../../assets/Form";
import { default as SendIcon } from '../../../graphics/icons/submitComment.svg'
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";
import { useCreateCommentMutation } from "../../../redux/api/fetchApi";
import { isConstructorDeclaration } from "typescript";

const CREATE_COMMENT = `
mutation createComment( $content: String, $post_id: String ){
    createComments( content: $content, post_id: $post_id ){
      content
      post_id
    }
  }`

interface CommentInputProps {
    id: string
}

const CommentInput: FC<CommentInputProps> = ( { id } ) => {

    const [ createComment, { data, isLoading } ] = useCreateCommentMutation()

    const ref = useRef<HTMLInputElement | null>( null )

    const handleSubmit: () => void = () => {
        if( !ref.current || !ref.current.value ) return

        createComment( {
            body: CREATE_COMMENT,
            variables: {
                content: ref.current.value,
                post_id: id
            }
        } )
    }

    return (
        <form className={ styles.comment_input }>
            {/* <Form id="inp" placeholder="leave a comment"/> */}
            <input 
                className={ styles.input } 
                placeholder="leave a comment"
                ref={ ref }
            />
            <Icon 
                iconPath={ SendIcon } 
                onClick={ handleSubmit } 
            />
        </form>
    )
}

export default CommentInput