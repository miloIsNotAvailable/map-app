
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

          get userscommunitiesbridge() {
            const table_name = "UsersCommunitiesBridge"
            return new Queries<Types.UsersCommunitiesBridge>( table_name )
          }

          get post() {
            const table_name = "Post"
            return new Queries<Types.Post>( table_name )
          }

          get vote() {
            const table_name = "Vote"
            return new Queries<Types.Vote>( table_name )
          }

          get comments() {
            const table_name = "Comments"
            return new Queries<Types.Comments>( table_name )
          }

          get responses() {
            const table_name = "Responses"
            return new Queries<Types.Responses>( table_name )
          }
        }
    