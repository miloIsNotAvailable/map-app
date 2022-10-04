import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { createContext, useContext } from "react";
import { Post, UsersCommunitiesBridge } from "../db/orm/dbinterfaces";
import { ContextType } from "../interfaces/ContextTypes";

const createPostsContext = createContext<{data?: any, isLoading: boolean }>( { data: { queryPosts: [] }, isLoading: false } )

export const PostsProvider = createPostsContext.Provider

export const usePostsProvider = <T>() => {

    const context = useContext( createPostsContext ) as { data?: T, isLoading: boolean }
    // return { data: (context as ContextType[]), isLoading: context.isLoading } as QueryRes
    return context
}