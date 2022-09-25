import { FC } from "react";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import { styles } from "./SearchStyles";
import Navbar from "../../mainscreen/navbar";
import SearchBar from "../searchbar/Searchbar";
import DisplayCommunity from "../displayCommunity/build/DisplayCommunity";

const Search: FC = () => {

    return (
        <div className={ styles.search_wrap }>
            <NavbarTop/>
            <div className={ styles.searchbar }>
                <SearchBar/>
            </div>
            <DisplayCommunity/>
            <Navbar/>
        </div>
    )
}

export default Search