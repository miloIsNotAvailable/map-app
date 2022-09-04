import { FC, lazy, Suspense } from "react";
import { default as Text } from '../../../graphics/icons/text.svg'
import { default as Image } from '../../../graphics/icons/image.svg'
import { default as Link } from '../../../graphics/icons/link.svg'
import { default as Repost } from '../../../graphics/icons/repost.svg'
import { styles } from "./PostInputStyles";
const PostInputIcon = lazy( () => import( "./PostInputIcon" ) )

const PostInputNavbar: FC = () => {

    const icons = [ 
        { icons: Text, name: "text" }, 
        { icons: Repost, name: "repost" }, 
        { icons: Link, name: "link" }, 
        { icons: Image, name: "image" } 
    ]

    return (
        <div className={ styles.post_navbar }>
            { icons.map( ( { icons, name } ) => (
                <Suspense fallback={
                    <div 
                        className={ styles.loading }
                        style={ {
                            width: 'calc(var(--font-size) + .5rem)'
                        } }
                    />
                }>
                    <PostInputIcon 
                        icon={ icons } 
                        name={ name }
                    />
                </Suspense>
            ) ) }
        </div>
    )
}

export default PostInputNavbar