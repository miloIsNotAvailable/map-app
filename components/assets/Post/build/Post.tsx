import { FC } from 'react'
import BuildPost from './BuildPost'
import { styles } from './PostStyles'

const Post: FC = () => {

    return (
        <div className={ styles.posts_wrap }>
            <BuildPost/>
            <BuildPost/>
            <BuildPost/>
        </div>
    )
}

export default Post