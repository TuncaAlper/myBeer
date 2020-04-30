import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey, baseUrl } from '../constants'

import uniq from 'lodash/uniq'

import LoadSpinner from './loadSpinner'
import SearchBar from './searchBar'
import BeerList from './listBeers'
import CountryList from './listCountries'

export default function LandingPage() {
    const [beerData, setBeerData] = useState([])
    const [locationsData, setLocationsData] = useState([])

    const [country, setCountry] = useState()
    const [reqBeer, setReqBeer] = useState({ value: false, name: "" })
    const [beer, setBeer] = useState()

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
        fetchLocationData()
    }, [])

    useEffect(() => {
        if (reqBeer.value) {
            setLoading(true)
            axios
                // .get(`${baseUrl}beers/`, {
                .get(`${baseUrl}search/`, {
                    params: {
                        key: apiKey,
                        // p: page,
                        q: reqBeer.name,
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
                setReqBeer(prevState => ({
                    ...prevState,
                    value: false
                }))
            }
        }
    }, [reqBeer])


    const handleSearchBeer = (e) => {
        e.preventDefault()
        setReqBeer(prevState => ({
            ...prevState,
            value: true
        }))
    }
    const handleClickCountry = (e, value) => {
        e.preventDefault()
        setCountry(value)
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
        setReqBeer(prevState => ({
            ...prevState,
            name: beerName
        }))
    }

    const countries = uniq(locationsData.map(res => res.country.displayName))


    if (loading) {
        return <LoadSpinner />
    } else if (true) {
        return (
            <div>
                <SearchBar
                    handleInputSearch={handleInputSearch}
                    handleSearchBeer={handleSearchBeer}
                />

                <CountryList
                    countries={countries}
                    handleClickCountry={handleClickCountry}
                />
                {country &&
                    <BeerList
                        handleClickBeer={handleClickBeer}
                        country={country}
                    />
                }
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
