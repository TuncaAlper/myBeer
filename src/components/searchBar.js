import React from 'react'
import './searchBar.css'

export default function SearchBar(props) {

    return (
        <div className="search-bar-container">
            <form className="search-bar">
                <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    onChange={e => props.handleInputSearch(e)}
                    placeholder="Search a beer brand"
                />
                <button className="ripple"
                    type="submit"
                    onClick={e => props.handleSearchBeer(e)}
                >Search </button>
            </form>
        </div>
    )
}