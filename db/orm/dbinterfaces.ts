export type  Users  = {
id: string
name: string
email: string
password: string
created_at?: string
community_id?: string
communities?: Communities
}

export type  Communities  = {
community_id: string
name: string
description: string
tags: string[]
created_at?: string
}

export type  UsersCommunitiesBridge  = {
user_id: string
community_id: string
communities?: Communities
users?: Users
}

export type  Post  = {
post_id: string
user_id: string
community_id: string
community_bridge_id?: string
votes?: number
content: string
type: string
title: string
communities?: Communities
users?: Users
}

export type  Vote  = {
vote_id: string
user_id: string
post_id: string
upvoted: boolean
downvoted: boolean
post?: Post
users?: Users
}

export type  Comments  = {
comment_id: string
user_id: string
post_id: string
content: string
post?: Post
users?: Users
}

export type  Responses  = {
response_id: string
user_id: string
post_id: string
comment_id: string
content: string
post?: Post
users?: Users
comments?: Comments
}

export type  NestedResponses  = {
response_id: string
user_id: string
post_id: string
comment_id: string
content: string
post?: Post
users?: Users
}