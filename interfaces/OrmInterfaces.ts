import { ExcludeMatchingProperties } from './custom'

type MapToBool<T> = {
    [Property in keyof T]: {
      [P in keyof T[Property]]: boolean
    }
  }
  
/**
 * @param Foreign gets rid of string string[] stirng | undefined types
 * @param T is the type that'll be converted
 */
type Foreign<T> = ExcludeMatchingProperties<T, (string | (string | undefined) | number)>

// convert nested values to Nullable values
type NestedPartial <T>= {
    [Property in keyof T]: Partial<T[Property]>
}

/**
 * @param NestedExclude
 * @description 
 * maps all the values in param T 
 * to partial and bool 
 * 
 * @example 
 * type V = { foo: string } // -> type V = { foo?: boolean }
 */
type NestedExclude<T>= {
    // [Property in keyof T]: NestedMap<NestedPartial<ExcludeMatchingProperties<T[Property], (string | string[] | (string | undefined))>>>
    [Property in keyof T]: MapToBool<Partial<T[Property]>>

}

type ReversePartial <T>= {
    [Property in keyof T]-?: T[Property]
}

/**
 * @param v
 * @param T is a custom type 
 * @returns 
 * type T convereted into a type 
 * with only non nullable values and 
 * types that aren't a type of string stirn[] or string | undefined
 */
type V<T> = ReversePartial<Foreign<T>>

// map everything to bool
type NestedMap<T, P=T>= {
    [Property in keyof T]: MapToBool<T[Property]> & { include?: Partial<NestedExclude<V<P>>> }
}

/**
 * @param IncludeType
 * 
 * @param T is the type infered by the orm itself
 * and it cannot be changed
 * @param P is the same as T by default but can be changed
 * to any type in selectType
 * 
 * @returns IncludeType returns key which is type infered
 * by the table and optional parameter P which returns 
 * tables that have 1-n or n-m relation with the 
 * table itself mapped to boolean and Partial; 
 * When custom value is passed it displays its values
 * which can be used in join 
 * (all of them mapped to bool and Partial still)
 */
type IncludeType<T, P=T> = NestedMap<NestedPartial<Foreign<P>>, P> & { key: MapToBool<Partial<T>> }

/**
 * @param selectType
 * 
 * @param T is the type infered by the orm 
 * @param P is the same as T by default but can be changed
 * to a custom table type and used for joins 
 */
export type selectType<T, P=T> = {
    // data?: T
    where?: Partial<T> 
    include?: IncludeType<T, P>
    AND?: Partial<T>
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
    data: Partial<T>,
    AND?: Partial<T>
}