// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import uniq from 'lodash/uniq'
// import includes from 'lodash/includes'
// import filter from 'lodash/filter'
// import mapL from 'lodash/map'
// import pick from 'lodash/pick'

// // import './landingPage.css'
// import LoadSpinner from './loadSpinner'
// import { apiKey, baseUrl } from '../constants'
// import { BeerCard } from './beerCard'
// import SearchBar from './searchBar'
// import muckData from './exampleBeer.json'
// import BeerList from './try2'

// export default function LandingPage() {
//     const [reqBeer, setReqBeer] = useState({ value: false, name: "" })
//     const [beerData, setBeerData] = useState(muckData.data)

//     const [exData, setExData] = useState([])

//     const [country, setCountry] = useState()
//     const [beer, setBeer] = useState()

//     const [loading, setLoading] = useState(false)
//     const [errorMsg, setErrorMsg] = useState(null)

//     useEffect(() => {
//         new Promise((resolve, reject) => {
//             getBeers(`${baseUrl}beers`, 1, [], resolve, reject)
//         })
//             .then(response => {
//                 console.log(response, "BeersGetREs")
//                 setBeerData(response)
//             })
//     })


//     // useEffect(() => {
//     //     const fetchBeerData = async (page) => {
//     //         setErrorMsg(null)
//     //         setLoading(true)
//     //         try {
//     //             const result = await axios.get(`${baseUrl}beers`, {
//     //                 params: {
//     //                     key: apiKey,
//     //                     p: page,
//     //                     // format: "json",
//     //                     withBreweries: "Y",
//     //                     // withSocialAccounts: "Y",
//     //                     // withIngredients: "Y"
//     //                 }
//     //             })
//     //             // .then(res =>
//     //             //     (page < res.data.numberOfPages) && fetchBeerData(page + 1)
//     //             // )
//     //             console.log(result, "BEER")
//     //             setBeerData(result.data.data)
//     //         } catch (error) {
//     //             setErrorMsg("Issue with /beers")
//     //         }
//     //         setLoading(false)
//     //     }
//     //     fetchBeerData()
//     // }, [])

//     // useEffect(() => {
//     //     const fetchBreweryData = async () => {
//     //         const result = await axios.get(`${baseUrl}breweries`, {
//     //             params: {
//     //                 key: apiKey,
//     //                 withLocations: "Y"
//     //             }
//     //         })
//     //         console.log(result, "REsultBreweries")
//     //     }
//     //     fetchBreweryData()
//     // }, [])


//     // const deneme = filter(beerData.map(res => res.breweries[0].locations.map(res => res.countryIsoCode)).flat(), "IE")

//     // console.log(deneme, "DENEME")
//     const countries = uniq(exData.map(res => res.country.displayName))
//     // console.log(exData, "Exdata")
//     // console.log(beerData, "BEERDATA")
//     // const functBeer = (beerData) => {
//     //     const name = beerData.map(res => res.name)
//     //     console.log(name)
//     // }
//     // functBeer(beerData)
//     const filteredBeerData = mapL(beerData).filter(res => res.breweries[0].locations.some(loc => loc.country.displayName === country))
//     console.log(filteredBeerData, "DATA")
//     if (loading) {
//         return <LoadSpinner />
//     } else if (true) {
//         return (
//             <div>
//                 <SearchBar
//                     handleInputSearch={handleInputSearch}
//                     handleSearchBeer={handleSearchBeer}
//                 />

//                 <ListCountries
//                     countries={countries}
//                     handleClickCountry={handleClickCountry}
//                 />
//                 {country &&
//                     // <ListBeers
//                     //     beers={filteredBeerData.map(res => res.name)}
//                     //     icons={filteredBeerData.map(res => res.labels.icon)}
//                     //     handleClickBeer={handleClickBeer}
//                     // />
//                     <BeerList
//                         handleClickBeer={handleClickBeer}
//                     />
//                 }
//             </div>
//         )
//     } else if (beerData && !errorMsg) {
//         return (
//             <div>

//                 {
//                     beerData.data.map((beers, index) =>
//                         <li>
//                             {/* <BeerCard
//                                 // page={page}
//                                 key={index}
//                                 data={beers}
//                             /> */}
//                         </li>
//                     )}
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 There is a problem
//                 <br />
//                 {errorMsg}
//                 <br />
//                 <button type="button" onClick={e => handleClickBack(e)}>
//                     Go back!
//                 </button>
//             </div>
//         )
//     }
// }

// export function ListCountries(props) {
//     return (
//         <div className="listCountry-container" style={{ position: "absolute", textAlign: "left", width: "30vw", left: "2vw", margin: "3vh" }}>
//             <div className="listCountry-row">
//                 <div className="listCountry-col" >
//                     <ul className="w3-ul w3-border">
//                         <li><h3 style={{ textDecoration: "underline" }}>Search by Country</h3></li>
//                         {props.countries.map((country, index) =>
//                             <li className='w3-hover-blue' key={index} onClick={e => props.handleClickCountry(e, country)}>{country}</li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export function ListBeers(props) {
//     return (
//         <div className="listBeer-container" style={{ position: "absolute", textAlign: "left", width: "30vw", right: "2vw", margin: "3vh" }}>
//             <div className="listBeer-row">
//                 <div className="listBeer-col" >
//                     <ul className="w3-ul w3-border">
//                         <li><h3 style={{ textDecoration: "underline" }}>Beers</h3></li>
//                         {props.beers.map((beer, index) =>
//                             <li className='w3-hover-orange' key={index} onClick={e => props.handleClickBeer(e, beer)}>{}{beer}</li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export const getBeers = (url, page, beers, resolve, reject) => {
//     axios.get(url, {
//         params: {
//             key: apiKey,
//             p: page,
//             withBreweries: "Y"
//         }
//     })
//         .then(response => {
//             const retrivedBeers = beers.concat(response.data.data)
//             // if (response.data.currentPage < response.data.numberOfPages) {
//             if (false) {
//                 getBeers(`${baseUrl}beers`, response.data.currentPage + 1, retrivedBeers, resolve, reject)
//             } else {
//                 resolve(retrivedBeers)
//             }
//         })
//         .catch(error => {
//             console.log(error)
//             reject('Something wrong. Please refresh the page and try again.')
//         })
// }

// // export function InfiniteScroll(props) {
// //     // const [infinite, setInfinite] = useState({
// //     //     beers: [],
// //     //     hasMore: true,
// //     //     isLoading: false,
// //     //     errorPage: false

// //     // })
// //     const [loadMore, setLoadMore] = useState(true)
// //     const [beers, setBeers] = useState([])

// //     useEffect(() => {
// //         getData(loadMore)
// //         setLoadMore(false)
// //     }, [loadMore])

// //     useEffect(() => {
// //         const list = document.getElementById('listBeer-container')

// //         // list has fixed height
// //         // list.addEventListener('scroll', (e) => {
// //         //     const el = e.target;
// //         //     if (el.scrollTop + el.clientHeight === el.scrollHeight) {
// //         //         setLoadMore(true);
// //         //     }
// //         // })

// //         // list has auto height  
// //         window.addEventListener('scroll', () => {
// //             if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
// //                 setLoadMore(true);
// //             }
// //         })

// //     }, [])

// //     useEffect(() => {
// //         const list = document.getElementById('listBeer-container');

// //         if (list.clientHeight <= window.innerHeight && list.clientHeight) {
// //             setLoadMore(true);
// //         }
// //     })

// //     const getData = (load) => {
// //         if (load) {
// //             axios.get(`${baseUrl}beers`, {
// //                 params: {
// //                     key: apiKey,
// //                     p: page,
// //                     withBreweries: "Y"
// //                 }
// //             })
// //                 .then(res => {
// //                     setBeers(prevState => ({
// //                         ...prevState, res
// //                     }))
// //                 })
// //         }
// //     }

// //     return (
// //     <div>
// //         a
// //         {console.log(beers, "BEERINFITI")}
// //     </div>
// // )
// // }