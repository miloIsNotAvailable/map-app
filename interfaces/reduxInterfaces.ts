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

export type userDataState = {
    userData: userDataType
}
