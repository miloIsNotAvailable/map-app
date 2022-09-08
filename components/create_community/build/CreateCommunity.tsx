import { FC, lazy, Suspense, useEffect } from "react";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import { styles } from "./CreateStyes";
import Navbar from "../../mainscreen/navbar";
import CreateName from "../name/CreateName";
// import Description from "../forms/Description";
import Fallback from "../../assets/Fallback";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PostNavbar from "../../assets/SubmitNavbar/PostNavbar";
// import Tags from "../forms/Tags";
const Tags = lazy( () => import( "../forms/Tags" ) )
const Description = lazy( () => import( "../forms/Description" ) )

const CreateCommunity: FC = () => {

    const { data, isLoading } = useAuthContext()
    const navigate = useNavigate()

    useEffect( () => {
        if( data && !isLoading && !data?.user?.id ) navigate( "/login" )
    }, [isLoading, data] )

    return (
      <div className={styles.create_wrap}>
        <NavbarTop />
        <CreateName />
        <div className={styles.input_wrap}>
          <Suspense fallback={<Fallback width="100%" height="100%" />}>
            <Description />
          </Suspense>
          <Suspense fallback={<Fallback width="100%" height="100%"/>}>
            <Tags />
          </Suspense>
        </div>
          <PostNavbar
            onCancel={ () => navigate( -1 ) }
            onSubmit={ () => console.log( "hello" ) }
          />
        <Navbar />
      </div>
    );
}

export default CreateCommunity