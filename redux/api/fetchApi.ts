import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'
import { Comments, Communities, Users, UsersCommunitiesBridge, Vote } from '../../db/orm/dbinterfaces';
import { CommunityPostContextType, ContextType } from '../../interfaces/ContextTypes';
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
    tagTypes: [ "refresh", "category", "voted", "joined" ],
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

        getPosts: query<ContextType, queryType>( {
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

        getCommunityPosts: query<CommunityPostContextType, queryType>( {
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
                return [ { type: "voted", id: res?.votes.post_id } ]
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

        hasJoined: query<{ hasJoined: UsersCommunitiesBridge }, queryType>( {
            providesTags: ( res ) => [ { type: "joined", id: res?.hasJoined?.community_id } ],
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

        comments: query<{ comments: Comments[] }, queryType>( {
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

        searchCommunity: mutation<{searchCommunity: Communities[]}, queryType>( {
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

        joinCommunity: mutation<{join: UsersCommunitiesBridge}, queryType>( {
            invalidatesTags: ( res, err, { variables: { community_id } } ) => [ { type: "joined", id: community_id } ],
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
            } ),

            async onQueryStarted( { variables, body }, { dispatch, queryFulfilled, getState } ) {
                
                // console.log( variables.post_id )
                const [ { originalArgs } ] = fetchApi.util.selectInvalidatedBy( getState(), [ { type: "joined", id: variables.community_id } ] ) 

                const patch = dispatch(
                    fetchApi.util.updateQueryData( 'hasJoined', originalArgs, draft => {
                        console.log( draft )
                        Object.assign( draft.hasJoined?.community_id, variables )
                    } )
                )

                try {
                    await queryFulfilled
                } catch( e ) {
                    patch.undo()
                }
            }
        } ),

        updateVotes: mutation<{ updateVotes: Exclusion<Vote, keyof { users: any, post: any }> }, queryType>( {
            invalidatesTags: ( res, err, { variables: { post_id } } ) => {
                console.log( post_id )
                return [ { type: "voted", id: post_id } ]
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
            } ),
            async onQueryStarted( { variables, body }, { dispatch, queryFulfilled, getState } ) {
                
                // console.log( variables.post_id )
                const [ { originalArgs } ] = fetchApi.util.selectInvalidatedBy( getState(), [ { type: "voted", id: variables.post_id } ] ) 

                const patch = dispatch(
                    fetchApi.util.updateQueryData( 'Votes', originalArgs, draft => {
                        console.log( draft )
                        Object.assign( draft.votes, variables )
                    } )
                )

                try {
                    await queryFulfilled
                } catch( e ) {
                    patch.undo()
                }
            }
        } ),

        createComment: mutation<{ createComments: Comments }, queryType>( {
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
    useVotesQuery,
    useSearchCommunityMutation,
    useHasJoinedQuery,
    useJoinCommunityMutation,
    useCreateCommentMutation,
    useCommentsQuery,
    useGetCommunityPostsQuery
} = fetchApi