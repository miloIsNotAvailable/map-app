import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { inputType } from '../../interfaces/reduxInterfaces'

const initialState: inputType = {
    type: "text"
}

const postInputTypeSlice = createSlice( {
    name: 'postInputTypeSlice',
    initialState,
    reducers: {
        getInputType: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.type = action.payload.type
        },

        getCommunity: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.community = action.payload.community
        },

        getTitle: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.title = action.payload.title
        },

        getContent: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.content = action.payload.content
        },

        getUserId: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.user_id = action.payload.user_id
        },
    }
} )

export const { 
    getInputType,
    getCommunity,
    getContent,
    getTitle,
    getUserId
} = postInputTypeSlice.actions

export default postInputTypeSlice.reducer