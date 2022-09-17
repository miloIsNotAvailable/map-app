import { ExcludeMatchingProperties } from './custom'

type MapToBool<T> = {
    [Property in keyof T]: {
      [P in keyof T[Property]]: boolean
    }
  }
  

export type selectType<T> = {
    // data?: T
    where?: Partial<T> 
    include?: {
        table: any
        key: string
    }
}

export type createType<T> = {
    data: T,
    include?: {
        data: any,
        where: any
    }
}

export type updateType<T> = {
    where: Partial<T>,
    data: Partial<T>
}