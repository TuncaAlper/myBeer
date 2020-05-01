import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey, baseUrl } from '../constants'
import './lists.css';

import uniq from 'lodash/uniq'

import LoadSpinner from './loadSpinner'
import SearchBar from './searchBar'
import BeerList from './listBeers'
import CountryList from './listCountries'
import StyleList from './listStyles'

export default function LandingPage() {
    const [beerData, setBeerData] = useState([])
    const [locationsData, setLocationsData] = useState([])
    const [stylesData, setStylesData] = useState([])

    const [country, setCountry] = useState([])
    const [style, setStyle] = useState([])
    const [beer, setBeer] = useState("")

    const [searchBeer, setSearchBeer] = useState({ value: false, name: "" })

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const fetchLocationData = async () => {
            const result = await axios.get(`${baseUrl}locations`, {
                params: {
                    key: apiKey
                }
            })
            setLocationsData(result.data.data)
        }
        const fetchStyleData = async () => {
            const result = await axios.get(`${baseUrl}styles`, {
                params: {
                    key: apiKey
                }
            })
            setStylesData(result.data.data)
        }
        fetchLocationData()
        fetchStyleData()
    }, [])

    useEffect(() => {
        if (searchBeer.value) {
            setLoading(true)
            axios
                .get(`${baseUrl}search/`, {
                    params: {
                        key: apiKey,
                        // p: page,
                        q: searchBeer.name,
                        withBreweries: 'Y',
                        withLocations: 'Y'
                    }
                })
                .then(res => {
                    console.log(res)
                    // setBeerData(res.data)
                    setLoading(false)
                })
                .catch(err => {
                    setErrorMsg(err.message)
                    setLoading(false)
                })

            return () => {
                setSearchBeer(prevState => ({
                    ...prevState,
                    value: false
                }))
            }
        }
    }, [searchBeer])


    const handleSearchBeer = (e) => {
        e.preventDefault()
        setSearchBeer(prevState => ({
            ...prevState,
            value: true
        }))
    }
    const handleClickCountry = (e, value) => {
        e.preventDefault()
        setCountry(country.concat(value))
    }
    const handleClickStyle = (e, value) => {
        e.preventDefault()
        setStyle(style.concat(value))
    }
    const handleClickBeer = (e, value) => {
        e.preventDefault()
        setBeer(value)
    }
    const handleClickBack = (e) => {
        e.preventDefault()
        setErrorMsg(null)
    }
    const handleInputSearch = (e) => {
        const beerName = e.target.value
        setSearchBeer(prevState => ({
            ...prevState,
            name: beerName
        }))
    }

    const countries = uniq(locationsData.map(res => res.country.displayName))
    const styles = uniq(stylesData.map(res => res.shortName))

    if (loading) {
        return <LoadSpinner />
    } else if (true) {
        console.log(country, style)
        return (
            <div>
                <SearchBar
                    handleInputSearch={handleInputSearch}
                    handleSearchBeer={handleSearchBeer}
                />
                <div className="lists-container" >
                    <div className="listLeft-col" >
                        <CountryList
                            countries={countries}
                            handleClickCountry={handleClickCountry}
                        />
                    </div>
                    <div className="listMiddle-col" >
                        <StyleList
                            styles={styles}
                            handleClickStyle={handleClickStyle}
                        />
                    </div>
                    {/* <div className="listRight-col" > */}
                    {
                        (country || style) &&
                        <BeerList
                            handleClickBeer={handleClickBeer}
                            handleClickCountry={handleClickCountry}
                            country={country}
                            style={style}
                        />
                    }
                    {/* </div> */}
                </div>
            </div>
        )
    } else if (beerData && !errorMsg) {
        return (
            <div>

                {
                    beerData.data.map((beers, index) =>
                        <li>
                            {/* <BeerCard
                                // page={page}
                                key={index}
                                data={beers}
                            /> */}
                        </li>
                    )}
            </div>
        )
    } else {
        return (
            <div>
                There is a problem
                <br />
                {errorMsg}
                <br />
                <button type="button" onClick={e => handleClickBack(e)}>
                    Go back!
                </button>
            </div>
        )
    }
}
