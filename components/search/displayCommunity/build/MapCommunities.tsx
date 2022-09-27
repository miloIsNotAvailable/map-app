import { FC } from "react";
import { useSearchCommunityMutation } from "../../../../redux/api/fetchApi";
import { styles } from "../../build/SearchStyles";
import Desc from "../details/Desc";
import Join from "../details/Join";
import Title from "../details/Title";

const MapCommunities: FC = () => {

    const [ , { data, isLoading } ] = useSearchCommunityMutation( {
        fixedCacheKey: 'search-community'
    } )

    return (
        <div className={ styles.display_community_map }>
            {
                data?.searchCommunity && data.searchCommunity.map( 
                    ( { community_id, description, name } ) => (
                        <div 
                            className={ styles.display_community }
                            key={ community_id }
                        >
                            <Title name={ name }/>
                            <Desc desc={ description }/>
                            <Join community_id={ community_id }/>
                        </div>
                    ) 
                )
            }
        </div>
    )
}

export default MapCommunities