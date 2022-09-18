import { FC, lazy, Suspense } from 'react'
import Fallback from '../../Fallback'
import BuildPost from './BuildPost'
import { styles } from './PostStyles'
// const BuildPost = lazy( () => import( './BuildPost' ) )

const Post: FC = () => {

    return (
        <div className={ styles.posts_wrap }>
            <BuildPost/>
            <BuildPost/>
            <BuildPost/>
            <BuildPost/>
        </div>
    )
}

export default Post