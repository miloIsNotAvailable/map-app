import { FC } from "react";
import { styles } from "../build/SearchStyles";

const SearchBar: FC = () => {

    return (
        <div className={ styles.searchbar_wrap }>
            <div className="icon"/>
            <input 
                className={ styles.searchbar_input }
                placeholder={ "find community" }
            />
        </div>
    )
}

export default SearchBar