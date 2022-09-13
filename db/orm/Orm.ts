import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { Lexer } from './Lexer'
dotenv.config()

export const ORM = class extends Lexer {
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

    private getDifference = ( a: string, b: string ) => {
      
      let a_ = a.split( "," )
      let b_ = b.split( "," )
      
      var i = 0;
        var j = 0;
        var result = [];
    
        while (j < b_.length)
        {
            if (a_[i] != b_[j] || i == a_.length)
                result.push( b_[j] );
            else
                i++;
            j++;
        }
        return result.join( "," );
    }

    private Alter = ( compare: string, altered: string ) => {
      const [ { cleaned: clean_compare } ] = this.strip( compare ) as [ { cleaned: string, name: string } ]
      const [ { cleaned: clean_alt, name } ] = this.strip( altered ) as [ { cleaned: string, name: string } ]
      
      let column = this.getDifference( clean_compare, clean_alt );
      // console.log( column )
      
      let c = column.split( "," ).map( ( n ) => {
        if( n.match( /CONSTRAINT/ ) ) 
          return `ADD${ n.replace( /\s\s+/g, " " ) }` 
        else 
          return `ADD COLUMN ${ n.replace( /\s\s+/g, " " ) }`    
      } )
      
      // const [{ name }] = strip( altered )
      return `ALTER TABLE ${ name.replace( /\s\s+/g, " " ) } ${ c.join( "," ) };`
    }

    /**
     * 
     * @param v is the schema itself
     * @returns an array of objects with fololwing items
     * cleanup -> contents of the table itself,
     * name -> name of the table
     * @example [{
     * cleanup: "id: STRING NOT NULL, name: STRING NULL",
     * name: "User"
     * }]
     */
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

    /**
     * 
     * @param cleanup is a list containing a list of 
     * cleaned up tables in schema and their names
     * @param db is db schema as string
     * 
     * @returns a string wit htypes for all tables in schema
     * @example export type User = { id: string, name: string }
     */
    private generateTypes: 
    ( v: ({
        cleaned: string;
        name: string;
    } | undefined)[], db: string ) => string = (cleanup, db) => {
        const types = cleanup.map( ( { cleaned, name }: any ) => {
            // split on every comma
            const contents = cleaned.split( "," )
            // map through all the rows and compile them
            const new_obj = contents.map( ( v: any ) => {

                let _string = ""
                // if gives type doesnt match the function 
                // it's just compiled to empty string
                _string=`${_string}${ this.compileString(v) }`
                _string=`${_string}${ this.compileTimestamp(v) }`
                _string=`${_string}${ this.compileNumber(v) }`
                _string=`${_string}${ this.compileForeignKey(v) }`

                // remove quotation marks
                return _string.replace( /["']/g, "" )
            } )
            return `export type ${name.replace( /["']/g, "" )} = {\n${new_obj.join( "\n" )}\n}`
          } )
          
          // if there are foreign keys change them to 
          // nullable types
          const compiled_ = this.compileColName( types.join("\n\n"), db )
          return compiled_
    }
    /**
     * 
     * @param v is the list containing cleanup and name of the function
     * @returns a string thats a class containing all the tables
     */
    private genClass = ( v: ({
      cleaned: string;
      name: string;
  } | undefined)[] ): string => {
      const classObjs = v.map( ( { name }: any ) => {
          return `
          get ${ name.trim().toLowerCase() }() {
            const table_name = "${name.trim()}"
            return new Queries<Types.${name.trim()}>( table_name )
          }`
      } )
      return `
        import * as Types from "./dbinterfaces"
        import { Queries } from "./Queries"
    
        export const Client = class {
          ${ classObjs.join( "\n" ) }
        }
    `
    }

    alterTables: ( db_path?: string ) => Promise<any> 
    = async( db_path = "/db/dbinit.sql" ) => {

      const schema_path = path.join( process.cwd(), db_path )
      const migration_path = path.join( process.cwd(), "/db/migrations/migration.sql" )
      
      const db = fs.readFileSync( schema_path, 'utf-8' )
      const migration = fs.readFileSync( migration_path, 'utf-8' )
      
      const stripped = this.strip( db )

      let separated = db.split( /(?=CREATE)/g )
      let separated_migration = migration.split( /(?=CREATE)/g )

      const v = separated.map( ( n, ind ) => {
        if( !n ) return ""
        
        let altered = separated_migration[ind] && n && n.replace( /\s\s+/g, " " ) !== separated_migration[ind].replace( /\s\s+/g, " " )
        
        if( altered ) {

          const add_column = this.Alter( separated_migration[ind], n )
        
          return add_column
        } else return ""
      } )

      const migration_ = db + "\n" + v.join( "\n" )

      const client = await this.connect()

      try {
        // const results = client.query( "SELECT NOW()" )
          const results = client.query( v.join( "\n" ) )
          .then( ( res ) => {
              
              console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mexecuted schema:" )
              console.log(res.rows);
              console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mcreating types:" )
              
              const types = this.generateTypes( stripped, db )
              const classObjs = this.genClass( stripped )

              console.log( "\x1b[0m", types )
              // fs.writeFileSync( 'db/orm/dbinterfaces.ts', types )
              fs.writeFileSync( 'db/migrations/migration.sql', db )
              fs.writeFileSync( 'db/orm/Client.ts', classObjs )
          } )
      } catch( err ) {
          console.log( "\x1b[41m", "unexpected error: ", "\x1b[0m", err )
      }

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
            // const results = client.query( "SELECT NOW()" )
            .then( ( res ) => {
                
                console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mexecuted schema:" )
                console.log(res.rows);
                console.log( "\n\x1b[36m%s\x1b[0m", "\x1b[1mcreating types:" )
                
                const types = this.generateTypes( stripped, schema )
                const classObjs = this.genClass( stripped )

                console.log( "\x1b[0m", types )
                fs.writeFileSync( 'db/orm/dbinterfaces.ts', types )
                fs.writeFileSync( 'db/orm/Client.ts', classObjs )
            } )
        } catch( err ) {
            console.log( "\x1b[41m", "unexpected error: ", "\x1b[0m", err )
        }
    }
}