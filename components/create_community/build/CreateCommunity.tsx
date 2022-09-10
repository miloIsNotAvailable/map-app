import { FC, useEffect } from "react";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import { styles } from "./CreateStyes";
import Navbar from "../../mainscreen/navbar";
import CreateName from "../name/CreateName";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PostNavbar from "../../assets/SubmitNavbar/PostNavbar";
import CreateForms from "../forms/build/CreateForms";
import { useRedux } from "../../../hooks/useRedux";
import { createCommunityState } from "../../../interfaces/reduxInterfaces";

const CreateCommunity: FC = () => {

    const { data, isLoading } = useAuthContext()
    const navigate = useNavigate()

    const [ { createCommunity } ] = useRedux<createCommunityState>()

    useEffect( () => {
        if( data && !isLoading && !data?.user?.id ) navigate( "/login" )
    }, [isLoading, data] )

    return (
      <div className={styles.create_wrap}>
        <NavbarTop />
        <CreateName />
        <CreateForms/>
        <PostNavbar
          onCancel={ () => navigate( -1 ) }
          onSubmit={ async( e: HTMLButtonElement ) => {
             
            try {
              if( !createCommunity?.name ){ 
                throw Error( "provide a name" ) 
              }
              console.log( createCommunity )
            } catch( e ) { console.log( e ) }
          } }
        />
        <Navbar />
      </div>
    );
}

export default CreateCommunity