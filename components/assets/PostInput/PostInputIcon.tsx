import { FC } from "react";

interface Props {
    icon: string,
    name: string
}

const PostInputIcons: FC<Props> = ( { 
    icon, 
    name 
} ) => {

    return <img style={ { width: 'var(--icon-size)', height: 'var(--icon-size)' } } src={ icon }/>
}

export default PostInputIcons