import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config()

export const ORM = class {
    connect = async(): Promise<Client> => {
        console.log( 'postgress server running on -> ' + '\x1b[36m%s\x1b[0m', process.env.DATABASE_URL )

        const client = new Client(process.env.DATABASE_URL);
        
        (async () => {
          await client.connect();
          try {
            const results = await client.query("SELECT NOW()");
            // console.log(results.rows);
          } catch (err) {
            console.error("error executing query:", err);
          } finally {
            client.end();
          }
        })();
    
        return client
    }

    private strip: 
    ( v: string ) => ({cleaned: string, name: string} | undefined)[] 
    = v => {
        
        // split on every CREATE
        let separated = v.split( /(?=CREATE)/g )
        
        // if there are any in schema 
        // get everything inside the outermost parenthesis
        const stripped = !!separated.length ? separated.map( table => {
            if( !table ) return
            const parenthesis = table.match( /(?<=\()(?:\([^()]*\)|[^()])*(?=\))/ )
            // get the name of the table
            const tableName = table.split( /(?<=CREATE TABLE IF NOT EXISTS)(.*)(?=\x28)/ )
            
            // return schema stripped of all the unnecessary spaces
            // and table name
            if( parenthesis ) return {
                cleaned: parenthesis[0].replace(/\s\s+/g, ' '),
                name: tableName[1]
            }
        } ) : []
        
        // remove undefined from the array
        const clean = stripped.filter( e => e !== undefined )
        return clean
    }

    private generateTypes: 
    ( v: ({
        cleaned: string;
        name: string;
    } | undefined)[] ) => string = cleanup => {
        const types = cleanup.map( ( { cleaned, name }: any ) => {
            const contents = cleaned.split( "," )
            const new_obj = contents.map( ( v: any ) => {

                let _string = ""
      
                const isString = !!v.match( /(STRING (.*))/g )
                const isNumber = !!v.match( /((FLOAT (.*))|(INT (.*)))/g )
                const isTime = !!v.match( /TIMESTAMP(.*)/g )
                      
                if( isString ) {
                  let new_ = v.trim()
                  .replace( /(STRING (.*))|(PRIMARY KEY STRING NOT(.*))/, "string" )
                  
                  if( 
                    !!v.trim().match( /DEFAULT/g ) || 
                    !!v.trim().match( /STRING NULL/g )  
                  ){
                    new_ = new_.replace( / /g, "?: " )
                    _string = `${_string}${new_}`
                  } else {
                    new_ = new_.replace( / /g, ": " )
                    _string = `${_string}${new_}`  
                  }
                }
                
                if( isTime ) {        
                  let new_ = v.trim()
                  .replace( /TIMESTAMP(.*)/, "string" )
                  
                  if( !!v.trim().match( /DEFAULT/g ) ){
                    new_ = new_.replace( / /g, "?: " )
                  _string = `${_string}${new_}`
                  } else {
                    new_ = new_.replace( / /g, ": " )
                    _string = `${_string}${new_}`  
                  }
                }
                
                if( isNumber ) {
                  let new_ = v.trim()
                  .replace( /(FLOAT(.*)|INT(.*))|(PRIMARY KEY (INT|FLOAT) NOT(.*))/, "number" )
                  
                  if( 
                    !!v.trim().match( /DEFAULT/g ) ||
                    !!v.trim().match( /(INT|FLOAT) NULL/g ) 
                  ){
                    new_ = new_.replace( / /g, "?: " )
                  _string = `${_string}${new_}`
                  } else {
                    new_ = new_.replace( / /g, ": " )
                    _string = `${_string}${new_}`  
                  }
                }          
                
                // console.log( _string ) 
                return _string.replace( /["']/g, "" )
            } )
            return `export type ${name.replace( /["']/g, "" )} = {\n${new_obj.join( "\n" )}}`
          } )
          
          return types.join( "\n\n" )
    }

    generate: ( db_path?: string ) => Promise<any> 
    = async( db_path = "/db/dbinit.sql" ) => {
        const schema_path = path.join( process.cwd(), db_path )
        const schema = fs.readFileSync( schema_path, 'utf-8' )
        const stripped = this.strip( schema )

        console.log( "\x1b[36m%s\x1b[0m", "\x1b[1m \x1b[4mloading schema:" )
        console.log( "\x1b[0m", schema )
        console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mexecuting schema:" )
        
        const client = await this.connect()
        try {
            const results = client.query( schema )
            .then( ( res ) => {
                
                console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mexecuted schema:" )
                console.log(res.rows);
                console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mcreating types:" )
                
                const types = this.generateTypes( stripped )
                console.log( "\x1b[0m", types )
                fs.writeFileSync( 'db/orm/dbinterfaces.ts', types )
            } )
        } catch( err ) {
            console.log( "\x1b[41m", "unexpected error: ", "\x1b[0m", err )
        }
    }
}