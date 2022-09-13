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
import { useCreateCommunityMutation } from "../../../redux/api/fetchApi";

const CREATE_COMMUNITY = `
mutation newCommunity( $community_id: String, $description: String, $name:String, $tags: [String] ){
  createCommunity( community_id: $community_id, description: $description, name: $name, tags: $tags ){
    community_id
    name
    description
    tags
  }
}`

const CreateCommunity: FC = () => {

    const { data, isLoading } = useAuthContext()
    const [ communityMutation, { data: communityData, isLoading: communityLoading } ] = useCreateCommunityMutation()
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
          isLoading={ communityLoading }
          onCancel={ () => navigate( -1 ) }
          onSubmit={ async( e: HTMLButtonElement ) => {
             
            try {
              if( !createCommunity?.name ){ 
                throw Error( "provide a name" ) 
              }
              communityMutation( {
                body: CREATE_COMMUNITY,
                variables: { ...createCommunity, description: createCommunity.desc }
              } )
            } catch( e ) { console.log( e ) }
          } }
        />
        <Navbar />
      </div>
    );
}

export default CreateCommunity