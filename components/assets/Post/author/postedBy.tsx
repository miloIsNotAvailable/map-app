import { FC, useEffect, useRef } from "react";
import { useOnScreen } from "../../../../hooks/useOnScreen";
import { useLazyGetCreatorQuery } from "../../../../redux/api/fetchApi";
import Fallback from "../../Fallback";
import { styles } from "../build/PostStyles";

const QUERY_CREATOR = `
query PostCreator( $id: String ){
    postCreator( id: $id ) {
        id
        name
    }
}
`

interface PostedByProps {
    id: string
}

const PostedBy: FC<PostedByProps> = ( { id } ) => {

    const [ queryWhileInView, { data, isLoading } ] = useLazyGetCreatorQuery()
    const ref = useRef<HTMLDivElement | null>( null )

    const isInView = useOnScreen( ref )

    useEffect( () => {
        if( !isInView && data ) return

        queryWhileInView( {
            body: QUERY_CREATOR,
            variables: { id }
        } )
    }, [ isInView, data ] )

    if( isLoading ) return (
        <div className={ styles.posted_by }>
            <Fallback width="6rem"/>
        </div>
    )

    return (
        <div className={ styles.posted_by }>
            posted by { data?.postCreator?.name }
        </div>
    )
}

export default PostedBy