import { Client } from "pg"
import { createType, selectType, updateType } from "../../interfaces/OrmInterfaces"
import { Users } from "./dbinterfaces"
import { ORM } from "./Orm"
import { Exclusion } from '../../interfaces/custom'

type ToUnion<T> = keyof T

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
        .map( n => `WHERE ${this.table_name}.${ n } = '${ (args as any)[n] }'` )

        return keys.join( "" )
    }   

    private getColsAndVals = ( args: T ): { cols: string, vals: string | string[] } => {
        const cols = Object.keys( args! )
        .map( n => n )
        .join( ", " )

        const vals = Object.keys( args! )
        .map( n => {
            if( (args as any)[n]?.constructor?.name == "Array" ) {
                return `ARRAY[${ (args as any)[n].map( (n: any) => `'${n}'` ) }]`
            }
            return `'${(args as any)[n]}'`
        } )
        .join( ", " )

        return { cols, vals }
    }

    private insert = ( args: T ): { cols: string, vals: string | string[] } => {
        
        if( !args ) return { cols: "", vals: "" }

        const { cols, vals } = this.getColsAndVals( args as T )

        return { cols, vals }
    }

    private update_ = async( { where, data, table }: updateType<T> & { table: string } ) => {
        try {
            const client = await this.orm.connect()
    
            const value = Object.keys( where ).map( v => `${v} = '${ (where as any)[v] }'` )
            const updateValue = Object.keys( data ).map( v => `${v} = '${ (data as any)[v] }'` )
    
            const queryData = `UPDATE ${ table } SET ${ updateValue } WHERE ${ value }`

            const r = await client.query( queryData )

            return r.rows

        } catch( e ) {
            console.log( e )
        }
    }

    update = async( { where, data }: updateType<T> ) => {

        await this.update_( { where, data, table: this.table_name } )
        // try {
        //     const client = await this.orm.connect()
    
        //     const value = Object.keys( where ).map( v => `${v} = '${ (where as any)[v] }'` )
        //     const updateValue = Object.keys( data ).map( v => `${v} = '${ (data as any)[v] }'` )
    
        //     const queryData = `UPDATE ${ this.table_name } SET ${ updateValue } WHERE ${ value }`
    
        //     const r = await client.query( queryData )

        //     return r.rows

        // } catch( e ) {
        //     console.log( e )
        // }
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

            console.log( `INSERT INTO ${ this.table_name } ( ${cols} ) VALUES (${ vals })` ) 

            const res = await client.query( `INSERT INTO ${ this.table_name } ( ${cols} ) VALUES (${ vals }) RETURNING ${ cols }` )

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
     * args.include is the join query. 
     * key is the the value on current table 
     * and second value is the table we want 
     * want to join and value we want to compare
     * @example
     *  // together this gives SELECT * FROM Post INNER JOIN post.community_id=community.community_id
     *  const data = await client.post.select( {
          include: {
            key: {
              // equivalent of post.community_id
              community_id: true
            },
            communities: {
              /// equivalent of communities.community_id
              community_id: true
            }
          }
        } )
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

            // const joinTableName = args?.include?.table && Object.keys(args.include?.table)[0]
            // const joinKey = joinTableName && Object.keys(( args?.include?.table as any )[ joinTableName ])[0]
            // const joinquery = joinTableName && `INNER JOIN ${ joinTableName } ON ${ this.table_name }.${ args?.include?.key } = ${ joinTableName }.${ joinKey }`

            const new_table = args?.include && Object.keys( args?.include ).filter( n => n !== "key" )
            const key: any =  args?.include && Object.keys( args?.include ).filter( n => n === "key" )
            
            const key_vals = key && Object.keys( (args?.include as any)[ key[0] ] )
            const new_table_vals = new_table && Object.keys( (args?.include as any)[ new_table[0] ] )

            const joinQuery = new_table && `INNER JOIN ${ new_table[0] } ON ${ this.table_name }.${ key_vals }=${ new_table[0] }.${ new_table_vals }`

            const pick = "*"
            const where = this.whereClause( args?.where )
            
            console.log( `SELECT ${ pick } FROM ${ this.table_name } ${ args?.include ? joinQuery : "" } ${ where }` ) 
            
            const res = await client.query( `SELECT ${ pick } FROM ${ this.table_name } ${ args?.include ? joinQuery : "" } ${ where }` )
            
            return res.rows
        } catch(e){
            console.log( e )
        }
    }
}