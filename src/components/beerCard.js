import React from 'react';

import './beerCard.css';

export function BeerCard(props) {
    console.log(props.data,"DAT")
    return (
        <div className="beerCard-main-container">
            <div className="beerCard-title-container">
                <p className="beerCard-main-title">{props.data.name}</p>
            </div>
            <div className="beerCard-detail-container">
                <p className="beerCard-detail-title">Country</p>
                <p className="beerCard-detail-subtitle">12/02/2020 18:11 GMT</p>
                <p className="beerCard-detail-title">Table</p>
                {/* <p className="beerCard-detail-subtitle">{props.data.style.description}</p> */}
            </div>
            {/* <div className="beerCard-button-container">
                <div style={{ textAlign: "center" }}>
                    <button
                        className="beerCard-push-btn"
                        onClick={e => props.handleDisplayInfoSections(e, props.dataReadyToSale[9], props.dataReadyToSale[1])}
                    >Push to the marketplace</button>
                    <br />
                    <button
                        className="beerCard-cancel-btn"

                    >Delete</button>
                </div>
            </div> */}
        </div>
    )
}