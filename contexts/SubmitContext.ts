import { createContext, MouseEvent, useContext } from "react";
import { submitContextType } from "../interfaces/ContextTypes";

const createSubmitContext = createContext<submitContextType>( {
    onCancel: undefined,
    onSubmit: undefined,
    isLoading: false
} )

export const SubmitContext = createSubmitContext.Provider

export const useSubmitContext = () => {
    const context = useContext( createSubmitContext )

    return context as { 
        onSubmit: <T=any>( e: T ) => void | undefined 
        onCancel: <T=any>( e: T ) => void | undefined
        isLoading: boolean
    }
}