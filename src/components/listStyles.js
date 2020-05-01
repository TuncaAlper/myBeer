import React from 'react';
import './lists.css';
import LoadSpinner from './loadSpinner';


export default function StyleList(props) {

    return (
        <ul id="style-container" >
            <h3 className="listRight-header" >Search by Style</h3>
            {
                props.styles.length > 0 ?
                    props.styles.map((style, index) =>

                        <li className="style-list" key={index} onClick={e => props.handleClickStyle(e, style)}>
                            {style}
                        </li>
                    )
                    : <LoadSpinner />
            }
        </ul>
    )
}