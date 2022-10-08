import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentType } from '../../interfaces/reduxInterfaces'

const initialState: CommentType = {
    responses: false,
    response_id: ""
}

const createCommentTypeSlice = createSlice( {
    name: 'createCommentTypeSlice',
    initialState,
    reducers: {
        isResponse: (
            state: CommentType,
            action: PayloadAction<CommentType>
        ) => {

            state.responses = action.payload.responses
            state.response_id = action.payload.response_id
        },
    }
} )

export const { 
    isResponse,
} = createCommentTypeSlice.actions

export default createCommentTypeSlice.reducer