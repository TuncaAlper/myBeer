import React, { useState, useEffect } from 'react';

export default function InfiniteScroll() {
    const [listBeers, setListBeers] = useState(Array.from(Array(30).keys(), n => n + 1))
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!isFetching) return
        fetchMoreListBeers()
    }, [isFetching])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return
        setIsFetching(true)
    }

    function fetchMoreListBeers() {
        setTimeout(() => {
            setListBeers(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]))
            setIsFetching(false)
        }, 2000)
    }
    console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight, document.documentElement.clientHeight, "DOCC")
    return (
        <>
            <ul className="list-group">
                {listBeers.map(beer => <li className="list-group-beer">List Beer {beer}</li>)}
            </ul>
            {isFetching && 'Fetching more list Beers...'}
        </>
    )
}