import { ChangeEvent, FC, useCallback } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchCommunityMutation } from "../../../redux/api/fetchApi";
import { styles } from "../build/SearchStyles";

const QUERY_COMMUNITY = `
mutation SearchCommunity( $name: String ){
    searchCommunity( name: $name ){
      community_id
      name
      description
      tags
    }
  }`

const SearchBar: FC = () => {

    const [ searchCommunity, { data, isLoading } ] = useSearchCommunityMutation( {
        fixedCacheKey: 'search-community'
    } )

    const debounce = useDebounce()
    
    const v = debounce( ( e ) => {
        searchCommunity( {
            body: QUERY_COMMUNITY,
            variables: { name: e }
        } )
    } )

    const handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        v( e.target.value )
    }

    return (
        <div className={ styles.searchbar_wrap }>
            <div className="icon"/>
            <input 
                className={ styles.searchbar_input }
                placeholder={ "find community" }
                onChange={ handleChange }
            />
        </div>
    )
}

export default SearchBar