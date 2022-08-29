import { useEffect } from "react"
import { Exclusion } from "../interfaces/custom"
import { userDataState, userDataType } from "../interfaces/reduxInterfaces"
import { useGetRefreshTokenMutation } from "../redux/api/fetchApi"
import { useAppSelector } from "../redux/hooks"

const USER_DATA = `
mutation SignUp ( $email: String, $password: String, $username: String ) {
    getUserData( email: $email, password: $password, username: $username ){
      __typename
          ... on LoginData {
        email
        password
      }
      ... on SignUpData {
        email
        password
        username
      }
    }
  }`

  type returnType = [
    () => void,
    { data: any, isLoading: boolean }
  ]

export const useLoginWithCredentials: () => returnType = () => {
    const selector = useAppSelector( ( state: userDataState ) => state.userData )

    
    const variables = selector as Exclusion<userDataType, keyof { error: any }>
    const [getToken, { data, isLoading }] = useGetRefreshTokenMutation()

    useEffect( () => {
        console.log( data )
    }, [ data, isLoading ] )

    const submit: () => void = () => {
      getToken( {
        body: USER_DATA,
        variables
      } )
    }

    return [ submit, { data, isLoading } ]
}