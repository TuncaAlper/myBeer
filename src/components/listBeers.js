import React, { useState, useEffect } from 'react';
import { apiKey, baseUrl } from '../constants'
import axios from 'axios'

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
        loadUser()
    }, [])
    useEffect(() => {
        if (pageState.data && filteredBeerData.length < 10 && !pageState.loading && pageState.currentPage !== pageState.totalPages) {
            loadMore()
        }
    })
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
        let lastLi = document.querySelector("ul#beer-container > li#beer-list:last-child")
        let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        let pageOffset = window.pageYOffset + (window.innerHeight * 0.9)

        if (pageOffset > lastLiOffset && !pageState.loading && pageState.currentPage !== pageState.totalPages) {
            loadMore()
        }
    }

    const loadUser = () => {
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
                currentPage: prevState.currentPage === prevState.totalPages ? prevState.currentPage : prevState.currentPage + 1,
                loading: true
            }))
            loadUser()
        } else {
            setPageState(prevState => ({
                ...prevState,
                finished: true
            }))
        }
    }

    const filteredBeerData = mapL(pageState.data).filter(res => res.breweries[0].locations.some(loc => loc.country.displayName === props.country))

    return (
        <div className="listBeer-container" style={{ position: "absolute", textAlign: "left", width: "30vw", right: "2vw", margin: "3vh" }}>
            <div className="listBeer-row" >
                <div className="listBeer-col" >
                    <ul id="beer-container" className="w3-ul w3-border" >
                        <li><h3 style={{ textDecoration: "underline" }}>Beers</h3></li>
                        {filteredBeerData.length > 0 ?
                            filteredBeerData.map((beer, index) =>
                                <li id="beer-list" className='w3-hover-orange' key={index} onClick={e => props.handleClickBeer(e, beer)}>{beer.nameDisplay}</li>
                            )
                            : <li id="beer-list" className='w3-hover-orange' >No related beer yet..</li>
                        }
                    </ul>
                    {pageState.loading && <LoadSpinner />}
                    {pageState.finished && <p>It was the last beer on our database. Thank you for looking all of them.</p>}
                </div>
            </div>
        </div>
    )
}