import { FC } from "react";
import { useCommentsQuery } from "../../../redux/api/fetchApi";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";
import Response from "./Response";

const QUERY_COMMENTS = `
query Comments( $post_id: String ) {
    comments( post_id: $post_id ){
      content
      post_id
      responses
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

    const arr = [
        { content: 'lorem ipsum', responses: [ { content: "" }, { content: "" } ] },
        { content: 'lorem ipsum', responses: [ { content: "", responses: [ { content: "" } ] } ] },
        // { content: 'lorem ipsum' },
    ]

    if( isLoading ) return (
        <div className={ styles.wrap_comments }>
            loading...
        </div>
    )

    return (
        <div className={ styles.wrap_comments }>
            <CommentLayout content={ data?.comments[0]?.content || "" }/>
            <Response arr={ data?.comments || [] }/>
        </div>
    )
}

export default CommentAndResponses