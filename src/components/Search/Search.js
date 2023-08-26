import React, {useRef, useState} from 'react';
import styles from "./search.module.css";
import {useDispatch} from "react-redux";
import {fetchAllProductsThunk} from "../../redux/fetchData";

const Search = () => {
    const [resSearch, setResSearch] = useState("");
    const ref = useRef();

    const dispachSearch = useDispatch();

    const searchResultHandler = () => {
        dispachSearch(fetchAllProductsThunk(`products?title_like=${ref.current.value}`))
    }

    return (
        <>
            <input type="text" className={styles['search-input']} ref={ref} placeholder="دنبال چه هستی؟" />
            <button className={`${styles['search_btn']} material-symbols-outlined`} onClick={searchResultHandler}>
                search
            </button>
        </>
    );
};

export default Search;
