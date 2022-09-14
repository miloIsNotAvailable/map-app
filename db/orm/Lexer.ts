export const Lexer = class {
    /**
     * @param removeSpaces
     * @description changes nullable SQL columns
     * to optional type
     * 
     * @param arg is an sql column as string
     * @example hello STRING NOT NULL,
     * 
     * @param replaceRegex is the regex part of 
     * replace statement when value is nullable or has a DEFAULT
     * @param replaceRes is a string matched regex expression
     * will be replaced with
     * 
     * @example 
     * // (arg__ is an SQL column)
     * // if statement has a DEFAULT or is Nullable 
     * // match every statement that is nullable ex. STRING NULL, FLOAT NULL
     * // and replace it with empty string
     * const res_ = this.removeSpaces( arg__, /(?<!NOT) NULL/g, "" )
     */
    removeSpaces = ( arg: string, replaceRegex: RegExp, replaceRes: string ) => {
        // has default value
        const def_ = !!arg.trim().match( /DEFAULT(.*)/g )
        // is nullable
        const null_ = !!arg.trim().match( /(?<!NOT) NULL/g )
        
        let v = ''
        
        if( null_ || def_ ) {
          const arg__ = arg
          .replace( replaceRegex, replaceRes )
          .trim()
          .replace( / /g, "?: " )
          
          return arg__
        }
        
        return arg.trim().replace( / /g, ": " )
      }
    /**
     * 
     * @param arg is an SQL column as string
     * @description compiles string column to 
     * TS type
     * @example 
     * // CREATE TABLE User( hello STRING NULL );
     * type User = { hello?: string }
     * @returns column converted to a type
     */
    compileString = ( arg: string ) => {
        // return empty string if it's not a string
        if( !arg.match( /(STRING(.*))/g ) ) return ""
        
        // change non nullable statements to string type
        const arg__ = arg.trim()
        .replace( /(STRING NOT (.*))|(STRING PRIMARY KEY NOT(.*))/, "string" )
        .replace( /STRING\[\]/, "string[]" )
        .replace( /STRING/, "string" )
        
        // add ?: or : depending on type
        const res_ = this.removeSpaces( arg__, /(?<!NOT) NULL/g, "" )

        return res_
      }
     /**
      * 
      * @param arg is an SQL column as string
      * @description compiles timestamp column to 
      * TS type
      * @example 
      * // CREATE TABLE User( created_at TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP );
      * type User = { created_at?: string }
      * @returns column converted to a string type
      */
      compileTimestamp = ( arg: string ) => {
        if( !arg.match( /TIMESTAMP(.*)/g ) ) return ""
        
        const arg__ = arg.trim()
        .replace( /TIMESTAMP^((?!DEFAULT).)*$/, "string" )
        
        const res_ = this.removeSpaces( arg__, /TIMESTAMP(.*)/, "string" )
        
        return res_
      }
      
     /**
      * 
      * @param arg is an SQL column as string
      * @description compiles float and int column to 
      * TS type
      * @example 
      * // CREATE TABLE Post( likes FLOAT NOT NULL );
      * type Post = { likes: number }
      * @returns column converted to a number type
      */
      compileNumber = ( arg: string ) => {
        // find float ot int not preceeded by constra- 
        // since CONSTRAINT is used for foreign keys 
        if( !arg.match( /((FLOAT (.*))|((?<!CONSTRA)INT (.*)))/g ) ) return ""
        
        // compile non nullable values to number
        const arg__ = arg.trim()
        .replace( /(FLOAT NOT(.*)|INT NOT(.*))|((INT|FLOAT) PRIMARY KEY NOT NULL(?<!DEFAULT))/, "number" )
        .replace( /FLOAT|INT/, "number" )
        
        // add : to non nullable values and ?: to values not preceeded by
        // NOT or that have a DEFAULT values
        const res_ = this.removeSpaces( arg__, /((?<!NOT) NULL)|(DEFAULT(.*))/, "" )
        
        return res_
      }
      
     /**
      * 
      * @param arg is an SQL column as string
      * @description compiles foreign key to 
      * TS type
      * @example 
      * // CREATE TABLE User( CONSTRAINT hello FOREIGN KEY (channel_id) REFERENCES Channel( id ) );
      * type User = { hello: Channel[] }
      * @returns column converted to a typeof table
      */
      compileForeignKey = ( arg: string ) => {
        // check for foreign key
        if( !arg.trim().match(/CONSTRAINT (.*) FOREIGN KEY/) ) return ""
        
        // contraint name
        const name = arg.trim().match( /CONSTRAINT (.*) FOREIGN KEY/ )
        // table it references ex. 'Channel('
        const reference = arg.trim().match( /REFERENCES (.*)(?<=\()/ )
        
        // get rid the parenthesis and create a type
        return `${ name![1] + "?: " + reference![1].replace("(", "") + "[]" }`
      }
      
     /**
      * 
      * @param arg is an SQL column as string
      * @param types is the string with already generated types
      * @description compiles foreign key value to 
      * TS type
      * @example 
      * // CREATE TABLE User( CONSTRAINT hello FOREIGN KEY (channel_id) REFERENCES Channel( id ) );
      * type User = { 
      *     channel_id?: string
      *     hello: Channel[] 
      * }
      * @returns column converted to an optional type
      */
      compileColName = ( types: string, arg: string ) => {
        if( !arg ) return types
        
        // look for foreign key
        const column = arg.trim().match( /FOREIGN KEY \((.*)\) REFERENCES/ )
        // no foreign keys leave stuff as is
        if( !column ) return types
        
        // name of the value matched
        const col_name = column[1]
        
        // find the matched value in string 
        // and make it an optional type 
        const new_ = types.replace( `${col_name}: `, `${col_name}?: ` )
        
        return new_
      }
}