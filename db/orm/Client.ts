
        import * as Types from "./dbinterfaces"
        import { Queries } from "./Queries"
    
        export const Client = class {
          
          get users() {
            const table_name = "Users"
            return new Queries<Types.Users>( table_name )
          }

          get communities() {
            const table_name = "Communities"
            return new Queries<Types.Communities>( table_name )
          }
        }
    