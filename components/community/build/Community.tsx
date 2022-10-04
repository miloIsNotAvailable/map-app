import { FC } from "react";
import { useParams } from "react-router-dom";
import Post from "../../assets/Post";
import Navbar from "../../mainscreen/navbar";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import CommunityName from "../desc/CommunityName";
import Desc from "../desc/Desc";
import { styles } from "./CommunityStyles";

const BuildCommunity: FC = () => {

    const { id } = useParams()

    return (
        <div className={ styles.community_wrap }>
            <NavbarTop/>
            <div className={ styles.community_name }>
                <CommunityName/>
            </div>
            <div className={ styles.desc_wrap }>
                <Desc/>
            </div>
            <Post/>
            <Navbar/>
        </div>
    )
}

export default BuildCommunity