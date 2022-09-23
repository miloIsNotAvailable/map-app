import { createContext, useContext } from "react";

const createActionsContext = createContext<{post_id: string, votes: number }>( { post_id: "", votes: 0 } )

export const ActionsContext = createActionsContext.Provider

export const useActionsProvider = () => {

    const context = useContext( createActionsContext )
    return context
}