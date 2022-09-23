import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'
import { Communities, Users } from '../../db/orm/dbinterfaces';

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): any =>
  async ({ body, variables }: any) => {
    const result = await request(baseUrl, body, variables);
    return { data: result };
  }

type queryType = {
    body: string, 
    variables: any
}

export const fetchApi = createApi( {
    reducerPath: 'api',
    tagTypes: [ "refresh", "category" ],
    baseQuery: graphqlBaseQuery( { 
        baseUrl: '/api/graphql' ,
    } ),
    endpoints: ( { mutation, query } ) => ({
        getHello: query<any, queryType>( {
            providesTags: [],
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        getRefreshToken: mutation<any, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        getUserAuth: query<any, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        getPosts: query<any, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        getCreator: query<{postCreator: Users}, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        Community: query<{community: Communities}, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        createCommunity: mutation<any, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        createPost: mutation<any, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),

        updateVotes: mutation<{updateVotes: { votes: number, post_id: string }}, queryType>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),
    })
} )

export const { 
    useGetHelloQuery,
    useLazyGetHelloQuery,
    useGetRefreshTokenMutation,
    useGetUserAuthQuery,
    useLazyGetUserAuthQuery,
    useCreateCommunityMutation,
    useCreatePostMutation,
    useGetPostsQuery,
    useLazyCommunityQuery,
    useLazyGetCreatorQuery,
    useUpdateVotesMutation
} = fetchApi