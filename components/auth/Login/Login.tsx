import { FC } from "react";
import Form from "../../assets/Form";
import { styles } from "./LoginStyles";

const Login: FC = () => {

    return (
        <div className={ styles.login_wrap }>
            <Form 
                style={ { gridArea: "a" } }
                placeholder={ "email" }
                type={ "email" }
            />
            <Form 
                style={ { gridArea: "b" } }
                placeholder={ "password" }
                type={ "password" }
            />
            <div style={ { gridArea: 'c' } }>submit</div>
            <div style={ { gridArea: 'd' } }>signup</div>
        </div>
    )
}

export default Login