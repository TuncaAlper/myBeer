import React, { useState } from 'react';
import './lists.css';
import LoadSpinner from './loadSpinner';


export default function StyleList(props) {
    const [searchStyle, setSearchStyle] = useState("")

    const searchedStyle = props.styles.filter(style => style.toLowerCase().includes(searchStyle.toLowerCase())).sort()

    searchedStyle.sort((a, b) => {
        if (props.style[b]) {
            return 1
        }
        if (props.style[a]) {
            return -1
        }
        return 0
    })

    return (
        <ul id="style-container" >
            <h3 >Search by Style</h3>
            {
                searchedStyle.length > 0 ?
                    <div>
                        <input
                            className="lists-input-search"
                            type="text"
                            placeholder="Search for a style.."
                            onChange={e => setSearchStyle(e.target.value)}
                        />
                        {searchedStyle.map((res, index) =>
                            <li
                                className="style-list"
                                key={index}
                                onClick={e => props.handleClickStyle(e, res)}
                                style={{ backgroundColor: props.style[res] && "rgb(61, 168, 218, 0.2)" }}
                            >
                                {res}
                            </li>

                        )}
                    </div>
                    : <LoadSpinner />
            }
        </ul>
    )
}