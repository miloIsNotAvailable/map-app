import { Request, Response } from "express";
import { Client } from "../db/orm/Client";

export default async function handler( req: Request, res: Response ) {

    try {
        
        const client = new Client()
        const data = await client.users.select( {} )
        // const data = await prisma.user.findMany()
        
        console.log( data )
        res.send( { name: 'john Doe' } )

    } catch( e ) {  console.log( e ) }

}
