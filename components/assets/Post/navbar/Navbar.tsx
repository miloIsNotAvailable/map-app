import { FC, useRef, useEffect } from "react";
import { useOnScreen } from "../../../../hooks/useOnScreen";
import { useLazyCommunityQuery } from "../../../../redux/api/fetchApi";
import Fallback from "../../Fallback";
import { styles } from "../build/PostStyles";
import CommunityName from "./CommunityName";
import Icon from "./Icon";

const COMMUNITY_QUERY = `
query Community( $community_id: String ){
    community( community_id: $community_id ) {
  community_id
  name
  description
  tags
}
}`

interface NavbarProps {
    community_id: string
}

const Navbar: FC<NavbarProps> = ( { community_id } ) => {

    const [ queryOnVisible, { data, isLoading, error } ] = useLazyCommunityQuery()
    const ref = useRef<HTMLDivElement | null>( null )

    const isInView = useOnScreen<HTMLDivElement | null>( ref )
    
    useEffect( () => {
        if( data && !isInView ) return

        queryOnVisible( {
            body: COMMUNITY_QUERY,
            variables: { community_id }
        } )
    }, [ isInView, data ] )

    if( isLoading && !data || !data?.community ) return (
        <div className={ styles.post_navbar }>
            <Icon/>
            <Fallback width="6rem"/>
            {/* <CommunityName name={ data?.community?.name }/> */}
        </div>
    )

    return (
        <div ref={ ref } className={ styles.post_navbar }>
            <Icon/>
            <CommunityName name={ data.community.name } id={ data.community.community_id }/>
        </div>
    )
}

export default Navbar