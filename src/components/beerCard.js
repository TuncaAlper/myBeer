import React from 'react';

import './beerCard.css';
import upperFirst from 'lodash/upperFirst'

export default function BeerCard(props) {
    const bData = props.data

    return (
        <div className="horizontal-card-container">
            <div className="hcard-logo-container">
                <img src={bData.labels ? bData.labels.icon : null} alt={null}></img>
            </div>
            <div className="hcard-detail-container">
                <div className="hcard-data-container">
                    <p className="hcard-data-name">
                        {bData.nameDisplay}
                    </p>
                    <p className="hcard-data-description">
                        <b>About: </b>{bData.description ? bData.description : "No description"}
                    </p>
                </div>
                <div className="hcard-data-tags">
                    {
                        bData.abv &&
                        < label >
                            % {bData.abv} Alcohol
                        </label>
                    }
                    {
                        bData.isOrganic &&
                        <label>
                            {bData.isOrganic === "N" ? "Non-Organic" : "Organic"}
                        </label>
                    }
                    {
                        bData.type &&
                        <label>
                            {upperFirst(bData.type)}
                        </label>
                    }
                </div>
            </div>
        </div >
    )
}