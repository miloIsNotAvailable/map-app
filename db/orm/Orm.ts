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
     * @returns a string wit htypes for all tables in schema
     * @example export type User = { id: string, name: string }
     */
    private generateTypes: 
    ( v: ({
        cleaned: string;
        name: string;
    } | undefined)[] ) => string = cleanup => {
        const types = cleanup.map( ( { cleaned, name }: any ) => {
            const contents = cleaned.split( "," )
            const new_obj = contents.map( ( v: any ) => {

                let _string = ""
      
                const isString = !!v.match( /(STRING(.*))/g )
                const isNumber = !!v.match( /((FLOAT (.*))|((?<!CONSTRA)INT (.*)))/g )
                const isTime = !!v.match( /TIMESTAMP(.*)/g )
                      
                const isKey = !!v.match( /CONSTRAINT(.*) FOREIGN KEY/g )
                
                if( isKey ){
                  const name = v.trim().match( /CONSTRAINT (.*) FOREIGN KEY/ )
                  const reference = v.trim().match( /REFERENCES (.*)(?<=\()/ )

                  _string = `${_string}${ name[1] + ": " + reference[1].replace("(", "") + "[]" }` 
                }

                if( isString ) {
                  let new_ = v.trim()
                  .replace( /(STRING (.*))|(PRIMARY KEY STRING NOT(.*))/, "string" )
                  .replace( /(STRING\[\])/, "string[]" )
                  .replace(/STRING/, "string")
                  
                  if( 
                    !!v.trim().match( /DEFAULT/g ) || 
                    !!v.trim().match( /STRING NULL/g )  
                  ){
                    // DEFAULT and Nullable values can be Nullable
                    new_ = new_.replace( / /g, "?: " )
                    _string = `${_string}${new_}`
                  } else {
                    // everything is required
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
              
              const types = this.generateTypes( stripped )
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
                
                const types = this.generateTypes( stripped )
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