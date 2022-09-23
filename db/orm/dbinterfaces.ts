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