import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'
import { Communities, Users, Vote } from '../../db/orm/dbinterfaces';
import { Exclusion } from '../../interfaces/custom';

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
    tagTypes: [ "refresh", "category", "voted" ],
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

        Votes: query<{votes: Vote & { _count: number }}, queryType>( {
            providesTags: ( res ) => {
                return [ { type: "voted", post_id: res?.votes.post_id } ]
            },
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

        updateVotes: mutation<{ updateVotes: Exclusion<Vote, keyof { users: any, post: any }> }, queryType>( {
            invalidatesTags: ( res, err, { variables: { post_id } } ) => {
                // console.log( fetchApi.endpoints.Votes. )
                return [ { type: "voted", post_id } ]
            },
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
    useUpdateVotesMutation,
    useVotesQuery
} = fetchApi