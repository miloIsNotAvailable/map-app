import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RootState } from "../redux/store"
/**
 * @desc quicker way to select and dispatch in redux
 * @example 
 * [ { hey }, dispatch ] = useRedux<someType>() // selector will have type of any if generic is not provided
 * // dispatch action
 * const handleSubmit = () => {
 *  dispatch( getHello( { hey: ref.current.value } ) )
 * }
 * @returns
 * selector with type provided in generic ( returns as any by default ), 
 * dispatch regular redux dispatch
 */

// type Gen<T=any> = T & RootState

export const useRedux = <T = RootState>(): [T, ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<any>] => {

    const dispatch = useAppDispatch()
    const selector: any = useAppSelector( ( state: RootState ) => state )

    return [ selector, dispatch ]
}