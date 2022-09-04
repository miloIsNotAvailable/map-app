import { createContext, useEffect } from 'react'
import { Users } from '../db/orm/dbinterfaces'
import { useGetUserAuthQuery, useLazyGetUserAuthQuery } from '../redux/api/fetchApi'

export const authContext = createContext<Partial<Users>>( {} )

export const AuthProvider = authContext.Provider

const GET_USER = `
query User {
    user {
      id
      email
      name
    }
  }`

export const useAuth = () => {
    
  const { data, isLoading, error } = useGetUserAuthQuery({
    body: GET_USER,
    variables: {}
  }) as { data: Partial<{ user: Users }>, isLoading: boolean, error: any }

    return { data, isLoading, error }
}