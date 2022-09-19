import { ExcludeMatchingProperties } from './custom'

type MapToBool<T> = {
    [Property in keyof T]: {
      [P in keyof T[Property]]: boolean
    }
  }
  
// get rid of all types that are string or string | null etc. 
type Foreign<T> = ExcludeMatchingProperties<T, (string | (string | undefined) | number)>

// convert nested values to Nullable values
type NestedPartial <T>= {
    [Property in keyof T]: Partial<T[Property]>
}

type NestedExclude<T>= {
    // [Property in keyof T]: NestedMap<NestedPartial<ExcludeMatchingProperties<T[Property], (string | string[] | (string | undefined))>>>
    [Property in keyof T]: MapToBool<Partial<T[Property]>>

}

type ReversePartial <T>= {
    [Property in keyof T]-?: T[Property]
}

type V<T> = ReversePartial<Foreign<T>>

// map everything to bool
type NestedMap<T>= {
    [Property in keyof T]: MapToBool<T[Property]> & { include?: Partial<NestedExclude<V<T>>> }
}

// put everything together 
type IncludeType<T> = NestedMap<NestedPartial<Foreign<T>>> & { key: MapToBool<Partial<T>> }

export type selectType<T> = {
    // data?: T
    where?: Partial<T> 
    include?: IncludeType<T>
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