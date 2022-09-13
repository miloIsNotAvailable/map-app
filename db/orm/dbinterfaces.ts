export type  Users  = {
id: string
name: string
email: string
password: string
created_at?: string
community_id?: string
communities: Communities[]
}

export type  Communities  = {
community_id: string
name: string
description: string
tags: string[]
created_at?: string
}