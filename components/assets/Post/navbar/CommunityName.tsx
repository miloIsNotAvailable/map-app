import { FC } from "react";
import { Link } from "react-router-dom";
import { usePostsProvider } from "../../../../contexts/PostsContext";

interface CommunityNameProps {
    name: string
    id: string
}

const CommunityName: FC<CommunityNameProps> = ( { name, id } ) => {

    return (
        <Link to={ "/community/" + id }>
            { name } 
        </Link>
    )
}

export default CommunityName