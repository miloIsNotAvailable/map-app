import { FC, lazy, Suspense } from "react";
import { default as Text } from '../../../graphics/icons/text.svg'
import { default as Image } from '../../../graphics/icons/image.svg'
import { default as Link } from '../../../graphics/icons/link.svg'
import { styles } from "./PostInputStyles";
import Fallback from "../Fallback";
// import PostInputIcons from "./PostInputIcon";
const PostInputIcons = lazy( () => import( "./PostInputIcon" ) )

const PostInputNavbar: FC = () => {

    const icons = [ 
        { icons: Text, name: "text" }, 
        { icons: Link, name: "link" }, 
        { icons: Image, name: "media" } 
    ]

    return (
      <div className={styles.post_navbar}>
        {icons.map(({ icons, name }) => (
          <Suspense
            key={name}
            fallback={
              <Fallback
                width={ "calc(var(--icon-size) + .5rem)" }
              />
            }
          >
            <PostInputIcons 
              icon={ icons } 
              name={ name }
            />
          </Suspense>
        ))}
      </div>
    );
}

export default PostInputNavbar