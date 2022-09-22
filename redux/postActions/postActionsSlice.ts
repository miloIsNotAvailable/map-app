import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postActionsType } from '../../interfaces/reduxInterfaces'

const initialState: postActionsType = {
    downvoted: false,
    upvoted: false,
    initial: 0
}

const postActionsSlice = createSlice( {
    name: 'postActionsSlice',
    initialState,
    reducers: {
        getVotes: (
            state: postActionsType,
            action: PayloadAction<postActionsType>
        ) => {

            state.initial = action.payload.initial

            if(  action.payload.upvoted ) {
                state.initial ++
            }
            
            if(  action.payload.downvoted ) {
                state.initial --
            }
        }
    }
} )

export const { 
    getVotes,
} = postActionsSlice.actions

export default postActionsSlice.reducer