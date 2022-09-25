import { FC } from "react";
import { styles } from "../../build/SearchStyles";
import Desc from "../details/Desc";
import Join from "../details/Join";
import Title from "../details/Title";

const MapCommunities: FC = () => {

    const communities = [ 
        { name: 'lorem_ipsum', description: "lorem ipsum dolorem sit amet", community_id: "" },
        { name: 'lorem_ipsum', description: "lorem ipsum dolorem sit amet", community_id: "" },
        { name: 'lorem_ipsum', description: "lorem ipsum dolorem sit amet", community_id: "" },
     ]

    return (
        <div className={ styles.display_community_map }>
            {
                communities.map( 
                    ( { community_id, description, name } ) => (
                        <div className={ styles.display_community }>
                            <Title name={ name }/>
                            <Desc desc={ description }/>
                            <Join/>
                        </div>
                    ) 
                )
            }
        </div>
    )
}

export default MapCommunities