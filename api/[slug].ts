import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function handler( req: Request, res: Response, next: NextFunction ) {
    
    const refresh_token = req.cookies["refresh_token"]
    // if( !refresh_token ) next()
    const acc_token = req.cookies["access_token"]
    // console.log( Math.random(), {acc_token} )
    
    const verify = jwt.verify( 
        refresh_token, 
        process.env.REFRESH_TOKEN!, ( err: any, token: any ) => {
          if( err ) return 
          jwt.verify( acc_token, process.env.ACCESS_TOKEN!, ( err: any, rsult: any ) => {
    
            if( err ) res.setHeader( 
            "Set-Cookie", 
            cookie.serialize(
              "access_token",
              jwt.sign( { id: token?.id, email: token?.email, name: token?.name }, process.env.ACCESS_TOKEN!, { expiresIn: '2m' } ), {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
              }
            ) 
          )
          } ) 
        } )

    next()
}