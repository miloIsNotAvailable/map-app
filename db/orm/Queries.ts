import { Client } from "pg"
import { selectType } from "../../interfaces/OrmInterfaces"
import { Users } from "./dbinterfaces"
import { ORM } from "./Orm"

export const Queries = class<T>{
    
    table_name: string
    orm: {
        connect: () => Promise<Client>
    }

    constructor( table_name: string ){
        this.table_name = table_name
        this.orm = new ORM()
    }

    select: ( args: selectType<T> ) => Promise<any> = async() => {
        const client = await this.orm.connect()
        try {   
            const res = await client.query( "SELECT NOW()" )
            // console.log( res.rows )
            return res.rows
        } catch(e){
            console.log( e )
        }
    }
}