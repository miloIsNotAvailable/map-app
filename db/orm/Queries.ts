import { Client } from "pg"
import { createType, selectType, updateType } from "../../interfaces/OrmInterfaces"
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

    update = async( { where, data }: updateType<T> ) => {
        
        try {
            const client = await this.orm.connect()
    
            const value = Object.keys( where ).map( v => `${v} = '${ (where as any)[v] }'` )
            const updateValue = Object.keys( data ).map( v => `${v} = '${ (data as any)[v] }'` )
    
            const queryData = `UPDATE ${ this.table_name } SET ${ updateValue } WHERE ${ value }`
    
            const r = await client.query( queryData )

            return r.rows

        } catch( e ) {
            console.log( e )
        }
    }

    /**
     * 
     * @param args takes data with type assigned to the table
     * @example 
     * CREATE TABLE User ( id STRING NOT NULL, name STRING NULL ) // type User = { id: string, name?: string }
     * const data = await client.user.create( { id: "some uuid" } )
     * 
     * @returns an object with created data
     * @example { id: "some uuid" }
     */
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
    /**
     * 
     * @param args takes a where object 
     * with values assigned to the type,
     * if args.where is not provided 
     * it returns everything from the table
     * 
     * @example 
     * const id = 1
     * client.user.select( { where: id } )
     * 
     * @returns an array of objects
     */
    select: ( args: selectType<T> | undefined ) => Promise<any> = async( args ) => {
        const client = await this.orm.connect()
        try { 

            const join = args?.include

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