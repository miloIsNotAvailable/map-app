// import * as Types from '../db/orm/dbinterfaces'
const T = import( '../db/orm/dbinterfaces' )


export type selectType<T> = {
    // data?: T
    where?: Partial<T> 
    include?: any
}

export type createType<T> = {
    data: T
}

export type updateType<T> = {
    where: Partial<T>,
    data: Partial<T>
}