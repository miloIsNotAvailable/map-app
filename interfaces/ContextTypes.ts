import { MouseEvent } from "react"
import { Communities, Post, UsersCommunitiesBridge } from "../db/orm/dbinterfaces"

export type onClickProps<T=any> = (( e: T ) => void)
export type submitContextType = { 
    onSubmit: onClickProps | undefined
    onCancel: onClickProps | undefined
    isLoading: boolean
 }

export type QueryPostsType = Partial<Post & UsersCommunitiesBridge & Communities>
export type ContextType = {queryPosts: QueryPostsType[]}
export type CommunityPostContextType = {queryCommunityPosts: QueryPostsType[]}
