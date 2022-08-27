import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { styles } from "./FormStyles";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface FormProps {

}

const Form: FC<InputProps & FormProps> = ( args ) => {

    return (
        <div 
            style={ { gridArea: args.style?.gridArea } }
            className={ styles.input_wrap } 
            placeholder={ args.placeholder }
            tabIndex={ 0 }
        >
            <input 
                className={ styles.input }
                { ...args }
            />
        </div>
    )
}

export default Form