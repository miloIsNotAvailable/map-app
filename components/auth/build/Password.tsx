import { ChangeEvent, FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { getUserPassword } from "../../../redux/auth/userDataSlice";
import { userDataState } from "../../../interfaces/reduxInterfaces";
import { styles } from "../Login/build/LoginStyles";
import Form from "../../assets/Form";

const Password: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>( null )  
    const dispatch = useAppDispatch()

    const selector = useAppSelector( ( state: userDataState ) => state.userData.error?.password )

    useEffect( () => {
        dispatch( getUserPassword( {
            password: undefined
        } ) )
    }, [] )

    const handleDispatch: 
    ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        // if( !inputRef.current ) return

        dispatch( getUserPassword( {
            password: e.target.value
        } ) )
    }

    return (
        <div className={ styles.input_type_wrap }>
            <Form
                // ref={ inputRef }
                type={ "password" }
                placeholder={ "password" }
                onChange={ handleDispatch }
            />
            { selector && 
            <div className={ styles.input_error }>
                { selector }
            </div> }
        </div>
    ) 
}

export default Password