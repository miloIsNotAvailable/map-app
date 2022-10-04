import { QueryDefinition } from '@reduxjs/toolkit/dist/query'
import { UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { FC, lazy, Suspense } from 'react'
import { PostsProvider } from '../../../../contexts/PostsContext'
import { ContextType } from '../../../../interfaces/ContextTypes'
import { useGetPostsQuery } from '../../../../redux/api/fetchApi'
import Fallback from '../../Fallback'
import BuildPost from './BuildPost'
import { styles } from './PostStyles'
// const BuildPost = lazy( () => import( './BuildPost' ) )

const POSTS_QUERY = `
query Posts {
    queryPosts{
      user_id
      community_id
        name
      post_id
      tags
      type
      title
      content
    }
  }`

const Post: FC = () => {

    return (
        <div className={ styles.posts_wrap }>
            <BuildPost/>
        </div>
    )
}

export default Post