import React from 'react';
import LoadSpinner from './loadSpinner';
import './lists.css';

export default function CountryList(props) {
    const sortedCountries = props.countries.sort()

    return (
        <ul id="country-container" >
            <h3 >Search by Country</h3>
            {
                sortedCountries.length > 0 ?
                    sortedCountries.map((res, index) =>
                        <li
                            className="country-list"
                            key={index}
                            onClick={e => props.handleClickCountry(e, res)}
                            style={{ backgroundColor: props.country[res] && "rgb(61, 168, 218, 0.2)" }}
                        >
                            {res}
                        </li>
                    )
                    : <LoadSpinner />
            }
        </ul>
    )
}