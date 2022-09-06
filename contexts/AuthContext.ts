import { createContext, useContext, useEffect } from 'react'
import { Users } from '../db/orm/dbinterfaces'
import { useGetUserAuthQuery, useLazyGetUserAuthQuery } from '../redux/api/fetchApi'

export const authContext = createContext<{ data: Partial<{ user: Users }>, isLoading: boolean, error: any }>( {
  data: {},
  error: undefined,
  isLoading: false
} )

export const AuthProvider = authContext.Provider

const GET_USER = `
query User {
    user {
      id
      email
      name
    }
  }`

export const useAuthContext = () => useContext( authContext )

export const useAuth = () => {
    
  const { data, isLoading, error } = useGetUserAuthQuery({
    body: GET_USER,
    variables: {}
  }) as { data: Partial<{ user: Users }>, isLoading: boolean, error: any }

    return { data, isLoading, error }
}