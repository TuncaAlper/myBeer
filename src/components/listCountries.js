import React from 'react';
import LoadSpinner from './loadSpinner';
import './lists.css';

export default function CountryList(props) {

    return (
        <ul id="country-container" >
            <h3 className="listLeft-header">Search by Country</h3>
            {
                props.countries.length > 0 ?
                    props.countries.map((country, index) =>

                        <li className="country-list" key={index} onClick={e => props.handleClickCountry(e, country)}>
                            {country}
                        </li>
                    )
                    : <LoadSpinner />
            }
        </ul>
    )
}