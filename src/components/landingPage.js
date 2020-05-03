import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey, baseUrl } from '../constants'
import './lists.css'
import './button.css'
import uniq from 'lodash/uniq'
import isEmpty from 'lodash/isEmpty'

import LoadSpinner from './loadSpinner'
import SearchBar from './searchBar'
import BeerList from './listBeers'
import CountryList from './listCountries'
import StyleList from './listStyles'
import BeerCard from './beerCard'

import MuckCountry from './exampleCountry.json'
import MuckStyle from './exampleStyle.json'
import MuckBeer from './exampleBeer.json'
import MuckSearch from './exampleSearch.json'

export default function LandingPage() {
    const [beerData, setBeerData] = useState([])
    const [locationsData, setLocationsData] = useState([])
    const [stylesData, setStylesData] = useState([])

    const [country, setCountry] = useState({})
    const [style, setStyle] = useState({})
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
                        q: searchBeer.name,
                        withBreweries: 'Y',
                        withLocations: 'Y'
                    }
                })
                .then(res => {
                    console.log(res)
                    setBeerData(res.data.data)
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
    const handleClickCountry = (e, name) => {
        e.preventDefault()
        setCountry(prevState => (
            { ...prevState, [name]: !country[name] }
        ))
    }
    const handleClickStyle = (e, name) => {
        e.preventDefault()
        setStyle(prevState => (
            { ...prevState, [name]: !style[name] }
        ))
    }
    const handleClickBeer = (e, value) => {
        e.preventDefault()
        setBeer(value)
    }
    const handleClickBack = (e) => {
        e.preventDefault()
        setErrorMsg(null)
        setBeerData([])
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
    console.log(loading)
    if (loading) {
        return (
            <>
                <h5>
                    Looking for beers based on your request..
                    <br />
                    <LoadSpinner />
                </h5>
            </>
        )
    } else if (isEmpty(beerData) && !errorMsg) {
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
                            country={country}
                            handleClickCountry={handleClickCountry}
                        />
                    </div>
                    <div className="listMiddle-col" >
                        <StyleList
                            style={style}
                            styles={styles}
                            handleClickStyle={handleClickStyle}
                        />
                    </div>
                    {
                        (!isEmpty(country) || !isEmpty(style)) &&
                        <BeerList
                            handleClickBeer={handleClickBeer}
                            handleClickCountry={handleClickCountry}
                            country={country}
                            style={style}
                        />
                    }
                </div>
            </div>
        )
    } else if (beerData && !errorMsg) {
        return (
            <div >
                <button
                    className="defined-button"
                    type="button"
                    onClick={e => handleClickBack(e)}
                >
                    Go Back!
                </button>
                <br />

                {
                    beerData.map((beers, index) =>
                        <BeerCard
                            key={index}
                            data={beers}
                        />
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
                    Go Back!
                </button>
            </div>
        )
    }
}
