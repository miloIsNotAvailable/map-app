import { Client } from "pg"
import { createType, selectType } from "../../interfaces/OrmInterfaces"
import { Users } from "./dbinterfaces"
import { ORM } from "./Orm"
import { Exclusion } from '../../interfaces/custom'

type ToUnion<T> = keyof T
type V = {
    name: string,
    id: string
}

type E = Pick<V, ToUnion<Exclusion<V, keyof {name: string}>>>
const e: E = {
    id: ""
}

export const Queries = class<T>{
    
    private table_name: string
    private orm: {
        connect: () => Promise<Client>
    }

    constructor( table_name: string ){
        this.table_name = table_name
        this.orm = new ORM()
    }

    private whereClause = <T=any>( args: T ) => {
        
        if( !args ) return ""
        const keys = Object.keys( args! )
        .map( n => `WHERE ${ n } = '${ (args as any)[n] }'` )

        return keys.join( "" )
    }   

    private getColsAndVals = ( args: T ): { cols: string, vals: string } => {
        const cols = Object.keys( args! )
        .map( n => n )
        .join( ", " )

        const vals = Object.keys( args! )
        .map( n => `'${(args as any)[n]}'` )
        .join( ", " )

        return { cols, vals }
    }

    private insert = ( args: T ): { cols: string, vals: string } => {
        
        if( !args ) return { cols: "", vals: "" }

        const { cols, vals } = this.getColsAndVals( args as T )

        return { cols, vals }
    }

    create: ( args: createType<T> ) => Promise<any> = async( args ) => {
        const client = await this.orm.connect()
        try {   
            const { cols, vals } = this.insert( args.data )
            const res = await client.query( `INSERT INTO ${ this.table_name } ( ${cols} ) VALUES (${ vals }) RETURNING ${ cols }` )

            console.log( `INSERT INTO ${ this.table_name } ( ${cols} ) VALUES (${ vals })` ) 
           
            return res.rows[0]
        } catch(e){
            console.log( e )
        }
    }
    
    select: ( args: selectType<T> | undefined ) => Promise<any> = async( args ) => {
        const client = await this.orm.connect()
        try {   
            const pick = "*"
            const where = this.whereClause( args?.where )
            const res = await client.query( `SELECT ${ pick } FROM ${ this.table_name } ${ where }` )
            
            console.log( `SELECT ${ pick } FROM ${ this.table_name } ${ where }` ) 
            
            return res.rows
        } catch(e){
            console.log( e )
        }
    }
}