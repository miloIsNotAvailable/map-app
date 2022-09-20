import { FC } from "react";

interface CommunityNameProps {
    name: string
}

const CommunityName: FC<CommunityNameProps> = ( { name } ) => {

    return (
        <div>
            { name } 
        </div>
    )
}

export default CommunityName