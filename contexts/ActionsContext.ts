import { createContext, useContext } from "react";
import { Vote } from "../db/orm/dbinterfaces";
import { useVotesQuery } from "../redux/api/fetchApi";

const createActionsContext = createContext<{ 
  data: { votes: Partial<Vote & {_count: number}> } | undefined,
  isLoading: boolean
}>( { 
  data: undefined,
  isLoading: false
} )

export const ActionsContext = createActionsContext.Provider

const VOTES_QUERY = `
query Votes($post_id:String){
    votes(post_id:$post_id){
      upvoted
      downvoted
      post_id
      _count
    }
  }`

export const useActionsProvider = () => {

    const context = useContext( createActionsContext )

    return { ...context }
}