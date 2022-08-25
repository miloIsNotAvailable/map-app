import { Request, Response } from "express";

export default async function handler( req: Request, res: Response ) {

    try {
        
        // const data = await prisma.user.findMany()
        
        // console.log( data )
        res.send( { name: 'john Doe' } )

    } catch( e ) {  console.log( e ) }

}
