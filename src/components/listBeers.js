import React, { useState, useEffect } from 'react';
import { apiKey, baseUrl } from '../constants';
import axios from 'axios';
import './lists.css';

import mapL from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
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
    const [searchBeer, setSearchBeer] = useState("")

    useEffect(() => {
        loadBeer()
    }, [])
    useEffect(() => {
        if (pageState.data && !pageState.loading && pageState.currentPage !== pageState.totalPages) {
            if (filteredSecond.length < 10) {
                loadMore()
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

    const filteredBeerData = !isEmpty(props.country) && Object.values(props.country).includes(true) ?
        mapL(pageState.data).filter(res => res.breweries[0].locations.some(loc => props.country[loc.country.displayName]))
        : pageState.data

    const filteredSecond = !isEmpty(props.style) && Object.values(props.style).includes(true) ?
        mapL(filteredBeerData).filter(res => res.style ? props.style[res.style.shortName] : false)
        : filteredBeerData

    const searchedBeer = filteredSecond.filter(res => res.nameDisplay.toLowerCase().includes(searchBeer.toLowerCase()))

    return (
        <div className="listRight-col" onScroll={handleScroll}>
            <ul id="beer-container" >
                <h3 className="listBeer-header" >
                    Beers
                </h3>
                <input
                    className="lists-input-search"
                    type="text"
                    placeholder="Search for a beer.."
                    onChange={e => setSearchBeer(e.target.value)}
                    style={{ border: "1px solid rgb(226, 168, 61)", width: "94.5%" }}
                />
                {
                    !isEmpty(searchedBeer) ?
                        searchedBeer.map((beer, index) =>
                            <li
                                id="beer-list"
                                key={index}
                                // onClick={e => props.handleClickBeer(e, beer)}
                            >
                                {beer.nameDisplay} <img src={beer.labels ? beer.labels.icon : null} alt={""} />
                            </li>
                        )
                        : <li id="beer-list">Looking for more beer..</li>

                }
            </ul>
            {
                pageState.finished && (
                    isEmpty(searchedBeer)
                        ? <p style={{ color: "red" }}>
                            Sorry Could not find a beer based on your selections..
                            </p>
                        : <p style={{ color: "red" }}>
                            Well Done! It was the last beer on our database.
                            <br />
                            Thank you for looking all of them.
                            </p>
                )
            }
            {
                (pageState.loading) &&
                <LoadSpinner />
            }
        </div>
    )
}