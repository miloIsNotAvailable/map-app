import { Loose } from "./custom"

export type userDataType = {
    email?: string
    password?: string
    username?: string
    error?: {
        email: string | undefined
        password: string | undefined
        username: string | undefined
    }
}

export type inputType = {
    type: Loose<"text" | "media" | "link", string>
}

export type createCommunityType = {
    tags: string[]
    newTag: string
    desc: string
    name: string
    img: string
}

export type userDataState = {
    userData: userDataType
}

export type postInputTypeState = {
    postInputType: inputType
}

export type createCommunityState = {
    createCommunity: Partial<createCommunityType>
}