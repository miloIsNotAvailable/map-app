import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { createContext, useContext } from "react";
import { Post, UsersCommunitiesBridge } from "../db/orm/dbinterfaces";
import { ContextType } from "../interfaces/ContextTypes";

const createPostsContext = createContext<{data?: ContextType, isLoading: boolean }>( { data: { queryPosts: [] }, isLoading: false } )

export const PostsProvider = createPostsContext.Provider

export const usePostsProvider = () => {

    const context = useContext( createPostsContext )
    // return { data: (context as ContextType[]), isLoading: context.isLoading } as QueryRes
    return context
}