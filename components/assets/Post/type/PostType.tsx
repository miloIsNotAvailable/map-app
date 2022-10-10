import { FC } from "react";
import { inputType } from "../../../../interfaces/reduxInterfaces";
import MediaPost from "./mediaPost";
import TextPost from "./textPost";

interface PostTypeProps {
    type: inputType["type"]
    content: string
}

const PostType: FC<PostTypeProps> = ( { type, content } ) => {

    const postTypes = [
        { type: "media", Component: MediaPost },
        { type: "text", Component: TextPost }
    ]

    return (
        <>
            { postTypes.map( ( { Component, type: postType } ) => (
                <>
                    { type === postType && <Component content={ content }/> }
                </>
            ) ) }
        </>
    )
}

export default PostType