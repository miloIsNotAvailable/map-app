export type selectType<T> = {
    // data?: T
    where?: Partial<T> 
}

export type createType<T> = {
    data: T
}