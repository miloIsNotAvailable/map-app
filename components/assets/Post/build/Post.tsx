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

type QueryRes = UseQueryHookResult<QueryDefinition<{ body:  string, variables: any }, any, "refresh" | "category", ContextType, "api">>

const Post: FC = () => {

    const { data, isLoading, error } = useGetPostsQuery( {
        body: POSTS_QUERY,
        variables: {}
    } ) as QueryRes
    return (
        <PostsProvider value={ {
          isLoading,
          data
        } }>
        <div className={ styles.posts_wrap }>
            <BuildPost/>
        </div>
        </PostsProvider>
    )
}

export default Post