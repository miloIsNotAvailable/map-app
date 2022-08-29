import { FC, useEffect } from "react";
import { useGetHelloQuery } from "../../../../redux/api/fetchApi";
import Email from "../../build/Email";
import Password from "../../build/Password";
import NavBar from "../navbar/NavBar";
import { styles } from "./LoginStyles";

const Login: FC = () => {

    // quick test
    const { data, isLoading } = useGetHelloQuery( {
        body: '{ hello }',
        variables: {}
    } )

    useEffect( () => {
        console.log( data )
    }, [ data ] )

    return (
        <div className={ styles.login_wrap }>
            <Email/>
            <Password/>
            <NavBar/>
        </div>
    )
}

export default Login