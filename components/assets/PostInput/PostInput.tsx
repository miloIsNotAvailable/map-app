import { FC, lazy, Suspense } from 'react'
import Form from '../Form'
import { styles } from './PostInputStyles'
import PostNavbar from './PostInputNavbar'
import AddCommunity from './PostInputCommunity'
const PostInputForm = lazy( () => import( "./PostInputForm" ) )

const PostInput: FC = () => {

    return (
        <div className={ styles.post_input_wrap }>
            <div className={ styles.post_input }>
                <Suspense fallback={
                    <div 
                        className={ styles.laoding }
                        style={ { width: "100%", height: '3rem' } }
                    />
                }>
                    <PostInputForm/>
                </Suspense>
                <PostNavbar/>
            </div>

        </div>
    )
}

export default PostInput