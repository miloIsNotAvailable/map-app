import { Request, Response } from "express";

export type rootType = {
    [name: string]: ( args: any, context: contextType ) => any | Promise<any>
}

export type contextType = {
    req: Request,
    res: Response
}