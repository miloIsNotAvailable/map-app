import { FC } from "react";

interface Props {
    icon: string,
    name: string
}

const PostInputIcons: FC<Props> = ( { 
    icon, 
    name 
} ) => {

    return <img src={ icon }/>
}

export default PostInputIcons