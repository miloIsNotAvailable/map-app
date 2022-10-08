import { FC } from "react";
import { useCommentsQuery } from "../../../redux/api/fetchApi";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";
import RespondTo from "./RespondTo";
import Response from "./Response";

const QUERY_COMMENTS = `
query Comments( $post_id: String ) {
    comments( post_id: $post_id ){
      content
      post_id
      responses
      comment_id
    }
  }
`

interface CommentAndResponsesProps {
    post_id: string
}

const CommentAndResponses: FC<CommentAndResponsesProps> = ( { post_id } ) => {

    const { data, isLoading } = useCommentsQuery( {
        body: QUERY_COMMENTS,
        variables: { post_id }
    } )

    console.log( data )

    if( isLoading ) return (
        <div className={ styles.wrap_comments }>
            loading...
        </div>
    )

    return (
        <div className={ styles.wrap_comments }>
                
                { data?.comments && data.comments.map( ( { content, comment_id } ) => (
                    <div style={ { height: 'fit-content' } }>
                        <div className={ styles.respond_user }>
                            <CommentLayout content={ content }/>
                            <RespondTo 
                                isLoading={ isLoading } 
                                response_id={ comment_id }
                            />
                        </div>
                        <Response response_id={ comment_id }/>
                    </div>
                ) ) }
        </div>
    )
}

export default CommentAndResponses