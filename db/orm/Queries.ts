import { Client } from "pg"
import { countType, createType, selectType, summarizeType, updateType } from "../../interfaces/OrmInterfaces"
import { Users } from "./dbinterfaces"
import { ORM } from "./Orm"
import { Exclusion } from '../../interfaces/custom'
import { client } from "../../_graphql/client/client"

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

    private update_ = async( { where, data, table, AND }: updateType<T> & { table: string } ) => {
        try {
            const client = await this.orm.connect()
    
            const value = Object.keys( where ).map( v => `${v} = '${ (where as any)[v] }'` )
            const updateValue = Object.keys( data ).map( v => `${v} = '${ (data as any)[v] }'` )
    
            const andQuery = AND && Object.keys( AND ).map( n => `AND ${ n }='${ (AND as any)[n] }'` )
            const queryData = `UPDATE ${ table } SET ${ updateValue } WHERE ${ value } ${ andQuery || "" }`

            const r = await client.query( queryData )

            return r.rows

        } catch( e ) {
            console.log( e )
        }
    }

    update = async( { where, data, AND }: updateType<T> ) => {

        await this.update_( { where, data, table: this.table_name, AND } )
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

    summarize: ( args: summarizeType<T> ) => Promise<any> = async( args ) => {
        const client = await this.orm.connect()
        try {   
            
            const where = this.whereClause( args.where )
            const andQuery = args?.AND && Object.keys( args.AND ).map( n => `AND ${ n }='${ (args.AND as any)[n] }'` )

            console.log( `SELECT COUNT(*) FROM ${ this.table_name } ${ where } ${ andQuery || "" }` ) 

            const res = await client.query( `SELECT COUNT(*) FROM ${ this.table_name } ${ where } ${ andQuery || "" }` )

            return res.rows[0] 
        } catch(e){
            console.log( e )
        }
    }

    private count_ = ( args: countType<T> | undefined ) => {
        if( !args ) return {
            count: "",
            group_by: "",
            order_by: ""
        }

        const vals = Object.values( args )[0]
        return {
            count: `,COUNT(${ vals })`,
            group_by: `${ this.table_name }.${ vals }`,
            order_by: `ORDER BY COUTN(${ vals })`
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
    select: <P=T>( args: selectType<T, P> | undefined ) => Promise<any> = async( args ) => {
        const client = await this.orm.connect()
        try { 

            // const count__ = this.count_( args?.count_ )

            /**
             * @param new_table is the name of the table in join 
               @key is the value that'll have to match 
               chosen table value
            */
            const new_table = args?.include && Object.keys( args?.include ).filter( n => n !== "key" )
            const key: any =  args?.include && Object.keys( args?.include ).filter( n => n === "key" )

            const key_vals = key && Object.keys( (args?.include as any)[ key[0] ] )
            const new_table_vals = new_table && Object.keys( (args?.include as any)[ new_table[0] ] )

            // name of the new table 
            const v = args?.include && new_table && (args?.include as any)[ new_table[0] ]?.include && Object.keys( (args?.include as any)[ new_table[0] ]?.include )
            // gets the values inside the table name
            const new_join_table = v && (args?.include as any)[ new_table[0] ]?.include[ v[0] ]
            // picks keys of the chosen values 
            const n = new_join_table && Object.keys(new_join_table)[0]

            const sub_inner_join = v && n && `INNER JOIN ${ v[0] } ON ${ new_table[0] }.${ new_table_vals }=${ v[0] }.${ n }`
            console.log( sub_inner_join )

            const joinQuery = new_table && `INNER JOIN ${ new_table[0] } ON ${ this.table_name }.${ key_vals }=${ new_table[0] }.${ new_table_vals }`

            const contains = args?.where && Object.values( args.where ).filter( n => typeof n !== "string" )[0]
            const containsKey = args?.where && Object.keys( args.where ).filter( n => typeof (args.where as any)[n] !== "string" )[0]
            const includesString = contains && (contains as any)?.contains

            const containsQuery = includesString && `WHERE ${ containsKey } LIKE '%${ includesString }%'`

            const pick = "*"
            const where = !containsQuery ? this.whereClause( args?.where ) : containsQuery
            
            const andQuery = args?.AND && Object.keys( args.AND ).map( n => `AND ${ n }='${ (args.AND as any)[n] }'` )

            console.log( `SELECT ${ pick } FROM ${ this.table_name } ${ args?.include ? joinQuery : "" } ${ where } ${ andQuery || "" }` ) 
            
            const res = await client.query( `SELECT ${ pick } FROM ${ this.table_name } ${ args?.include ? joinQuery : "" } ${ where } ${ andQuery || "" }` )
            
            return res.rows
        } catch(e){
            console.log( e )
        }
    }
}