import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function handler( req: Request, res: Response, next: NextFunction ) {
    
    const refresh_token = req.cookies["jwt_refresh_token"]
    if( !refresh_token ) next()

    const acc_token = req.cookies["access_token"]

    jwt.verify( refresh_token, process.env.REFRESH_TOKEN!, ( err: any, data: any ) => {
        if( err ) return
        if( !acc_token ){ 
            const new_token = jwt.sign( data, process.env.ACCESS_TOKEN!, { expiresIn: '15s' } )
            res.setHeader( 
                "Set-Cookie",  
                cookie.serialize(
                  "access_token", new_token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 15,
                        path: "/"
                    } 
                )
            )
        }
    } )

    next()
}