import React from 'react';
import LoadSpinner from './loadSpinner';

export default function CountryList(props) {
    return (
        <div className="listCountry-container" style={{ position: "absolute", textAlign: "left", width: "30vw", left: "2vw", margin: "3vh" }}>
            <div className="listCountry-row">
                <div className="listCountry-col" >
                    <ul className="w3-ul w3-border" >
                        <li><h3 style={{ textDecoration: "underline" }}>Search by Country</h3></li>
                        {props.countries.length > 0 ? props.countries.map((country, index) =>
                            <li className='w3-hover-blue' key={index} onClick={e => props.handleClickCountry(e, country)}>{country}</li>
                        )
                            : <LoadSpinner />
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}