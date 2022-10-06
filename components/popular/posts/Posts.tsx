import { FC } from "react";
import { PostsProvider } from "../../../contexts/PostsContext";
import { useGetPostsQuery } from "../../../redux/api/fetchApi";
import Post from "../../assets/Post";
import { styles } from "../build/PopularStyles";

const POSTS_QUERY = `
query Posts($community_id: String) {
    queryPosts( community_id: $community_id ){
      user_id
      community_id
      name
      description
      post_id
      tags
      type
      title
      content
    }
  }`

const Posts: FC = () => {

    const { data, isLoading, error } = useGetPostsQuery( {
        body: POSTS_QUERY,
        variables: {  }
    } )

    return (
        <div className={ styles.popular_posts_wrap }>
        <PostsProvider value={ {
            isLoading,
            data
        } }>
            <Post/>
        </PostsProvider>
        </div>  
    )
}

export default Posts