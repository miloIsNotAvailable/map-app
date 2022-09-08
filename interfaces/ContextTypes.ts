import { MouseEvent } from "react"

export type onClickProps<T=any> = (( e: T ) => void)
export type submitContextType = { 
    onSubmit: onClickProps | undefined
    onCancel: onClickProps | undefined
 }