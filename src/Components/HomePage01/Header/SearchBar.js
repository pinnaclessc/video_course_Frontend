import React from 'react'
import styles from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa";


function SearchBar() {

    return (
        <div className={styles['container1']}>
            <div className={styles['input-wrap']}>
                < FaSearch color="#5c5470" fontSize="0.8em" opacity="0.7" />

                <input
                    type="text"
                    name="product-search"
                    id="product-search"
                    placeholder="Search For Anything"
                />
            </div>
        </div>
    );
}

export default SearchBar