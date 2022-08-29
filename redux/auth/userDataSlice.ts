import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDataType } from '../../interfaces/reduxInterfaces'

const initialState: userDataType = {
    email: "",
    password: "",
    username: "",
    error: {
        email: "",
        password: "",
        username: ""
    }
}

const userDataSlice = createSlice( {
    name: 'userDataSlice',
    initialState,
    reducers: {
        getUserEmail: (
            state: userDataType,
            action: PayloadAction<userDataType>
        ) => {
            if( !action.payload.email ) {
                state.error!.email = 'no email provided'
                return
            }
            
            const valid = !!action.payload.email.match( /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i )
            console.log( valid )
            if( !valid ) {
                state.error!.email = 'invalid email'
                state.email = ""
                return
            }
            state.error!.email = undefined
            state.email = action.payload.email
        },

        getUserPassword: (
            state: userDataType,
            action: PayloadAction<userDataType>
        ) => {
            const valid = action.payload.password
            if( !valid ) {
                state.error!.password = 'invalid password'
                state.password = ""
                return
            }
            state.error!.password = undefined
            state.password = action.payload.password
        },

        getUserUsername: (
            state: userDataType,
            action: PayloadAction<userDataType>
        ) => {
            const valid = action.payload.username
            if( !valid ) {
                state.error!.username = 'invalid username'
                state.username = ""
                return
            }
            
            state.error!.username = undefined
            state.username = action.payload.username
        },
    }
} )

export const { 
    getUserEmail, 
    getUserPassword, 
    getUserUsername 
} = userDataSlice.actions

export default userDataSlice.reducer