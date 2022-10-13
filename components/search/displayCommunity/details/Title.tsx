import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../build/SearchStyles";

interface TitleProps {
    name: string
    community_id: string
}

const Title: FC<TitleProps> = ( { name, community_id } ) => {

    return (
        <Link
            to={ "/community" + "/" + community_id } 
            className={ styles.display_community_title }>
            <div className="icon"/>
            <div>{ name }</div>
        </Link>
    )
}

export default Title