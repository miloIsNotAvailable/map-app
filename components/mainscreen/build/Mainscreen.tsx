import { FC } from "react";
import { Link } from "react-router-dom";
import { PostsProvider } from "../../../contexts/PostsContext";
import { useGetPostsQuery } from "../../../redux/api/fetchApi";
import Post from "../../assets/Post";
import PostInput from "../../assets/PostInput";
import Navbar from "../navbar/build/Navbar";
import NavbarTop from "../navbar/NavbarTop";
import { styles } from "./MainscreenStyles";

const POSTS_QUERY = `
query Posts($community_id: String) {
    queryPosts( community_id: $community_id ){
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

const Mainscreen: FC = () => {

    const { data, isLoading, error } = useGetPostsQuery( {
        body: POSTS_QUERY,
        variables: {}
    } )

    return (
        <div className={ styles.mainscreen_wrap }>
            <NavbarTop/>
            <Link to="/new-post">
                <PostInput/>
            </Link>
            <PostsProvider value={ {
                isLoading,
                data
            } }>
                <Post/>
            </PostsProvider>
            <Navbar/>
        </div>
    )
}

export default Mainscreen