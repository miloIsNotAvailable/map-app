import { FC, MouseEvent } from "react";
import FormInput from "../../../assets/Form";
import NavBar from "../navbar/NavBar";
import Submit from "../navbar/Submit";
import { styles } from "./LoginStyles";

const Login: FC = () => {

    const handleSubmit: 
    ( e: MouseEvent<HTMLFormElement> ) => void = e => {
        e.preventDefault()
        // console.log( e.target )
    }

    return (
        <form 
            className={ styles.login_wrap }
            onClick={ handleSubmit }    
        >
            <FormInput 
                // onChange={ e => console.log( e.target.value ) }
                placeholder={ "email" }
                type={ "email" }
            />
            <FormInput 
                placeholder={ "password" }
                type={ "password" }
            />
            <NavBar/>
        </form>
    )
}

export default Login