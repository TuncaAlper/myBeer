import React, { useState, useEffect } from 'react';
import { apiKey, baseUrl } from '../constants';
import axios from 'axios';
import './lists.css';

import mapL from 'lodash/map'
import LoadSpinner from './loadSpinner'

export default function BeerList(props) {

    const [pageState, setPageState] = useState({
        data: [],
        currentPage: 1,
        nextPage: 1,
        totalPages: null,
        loading: true,
        finished: false
    })

    useEffect(() => {
        loadBeer()
    }, [])
    useEffect(() => {
        // let allUL = document.querySelector("#beer-container")
        // let lastLi = document.querySelector("ul#beer-container > li#beer-list:last-child")

        // let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        // let allUlOffset = allUL.offsetTop + (allUL.clientHeight * 0.8) + allUL.scrollTop
        // console.log(allUlOffset, lastLiOffset, "HEY")
        if (pageState.data && !pageState.loading && pageState.currentPage !== pageState.totalPages) {
            if (filteredSecond.length < 10) {
                // loadMore()
            }
        }
    })
    useEffect(() => {
        if (pageState.currentPage === pageState.totalPages) {
            setPageState(prevState => ({
                ...prevState,
                finished: true
            }))
        }
    }, [pageState.currentPage, pageState.totalPages])

    const handleScroll = () => {
        let allUL = document.querySelector(".listRight-col")
        let lastLi = document.querySelector("ul#beer-container > li#beer-list:last-child")

        let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        let allUlOffset = allUL.offsetTop + allUL.clientHeight + allUL.scrollTop
        console.log(allUlOffset, lastLiOffset, "OFF")
        if (allUlOffset > lastLiOffset && !pageState.loading && pageState.currentPage !== pageState.totalPages) {
            loadMore()
        }
    }

    const loadBeer = () => {
        console.log(pageState.nextPage, "PA")
        axios.get(`${baseUrl}beers`, {
            params: {
                key: apiKey,
                p: pageState.nextPage,
                withBreweries: "Y"
            }
        })
            .then(res =>
                setPageState(prevState => ({
                    ...prevState,
                    data: prevState.data.concat(res.data.data),
                    loading: false,
                    nextPage: prevState.nextPage === prevState.totalPages ? prevState.nextPage : prevState.nextPage + 1,
                    totalPages: res.data.numberOfPages
                }))
            )
            .catch(err => {
                console.log(err)
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                    nextPage: prevState.nextPage === 1 ? prevState.nextPage : prevState.nextPage - 1
                }))
            })
    }

    const loadMore = () => {
        if (pageState.currentPage !== pageState.nextPage) {
            setPageState(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1,
                loading: true
            }))
            loadBeer()
        }
    }

    const filteredBeerData = props.country ? mapL(pageState.data).filter(res => res.breweries[0].locations.some(loc => loc.country.displayName === mapL(props.country))) : pageState.data
    console.log(filteredBeerData)
    console.log(mapL(props.country), "CCC")
    const filteredSecond = mapL(filteredBeerData).filter(res => res.style ? res.style.shortName === mapL(props.style) : false)
    console.log(filteredSecond)
    return (
        <div className="listRight-col" onScroll={handleScroll}>
            <ul id="beer-container" >
                <h3 className="listBeer-header" >
                    Beers {props.country ? "of " + props.country : null} {props.style ? "by types " + props.style : null}
                    {/* <button type="button" onClick={e => props.handleClickCountry(e, "")}>X</button> */}
                </h3>
                {filteredSecond.length > 0 ?
                    filteredSecond.map((beer, index) =>
                        <li id="beer-list" key={index} onClick={e => props.handleClickBeer(e, beer)}>
                            {beer.nameDisplay} <img src={beer.labels ? beer.labels.icon : null} alt={""} />
                        </li>
                    )
                    : <li id="beer-list" >Sorry Could not find a beer based on your selections..</li>
                }
                {
                    (filteredSecond.length > 0 && pageState.loading) &&
                    <LoadSpinner />
                }
                {
                    pageState.finished &&
                    <p style={{ color: "red" }}>
                        Well Done! It was the last beer on our database.
                            <br />
                            Thank you for looking all of them.
                        </p>
                }
            </ul>
        </div>
    )
}