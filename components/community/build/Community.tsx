import { FC } from "react";
import { useParams } from "react-router-dom";
import { PostsProvider } from "../../../contexts/PostsContext";
import { useGetPostsQuery } from "../../../redux/api/fetchApi";
import Post from "../../assets/Post";
import Navbar from "../../mainscreen/navbar";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import CommunityName from "../desc/CommunityName";
import Desc from "../desc/Desc";
import { styles } from "./CommunityStyles";

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

const BuildCommunity: FC = () => {

    const { id } = useParams()

    const { data, isLoading, error } = useGetPostsQuery( {
        body: POSTS_QUERY,
        variables: { community_id: id }
    } )

    return (
        <PostsProvider value={ {
            isLoading,
            data
        } }>
            <div className={ styles.community_wrap }>
                <NavbarTop/>
                <div className={ styles.community_name }>
                    <CommunityName/>
                </div>
                <div className={ styles.desc_wrap }>
                    <Desc/>
                </div>
                    <div className={ styles.community_posts_wrap }>
                        <Post/>
                    </div>
                <Navbar/>
            </div>
        </PostsProvider>
    )
}

export default BuildCommunity