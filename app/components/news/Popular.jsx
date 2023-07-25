import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { STORENEWSDATA } from '@/app/store/reducers/NewsDataReducer'


const Popular = () => {
    const [newsDataLocal, setLocalNewsData] = useState([])
    // get data from state
    const preferenceData = useSelector((state) => state.news)
    const enabled = preferenceData.displayGrid

    const dispatch = useDispatch()
    // func to fetch the data from API, using fetch instead of react query or axios
    const fetchPopularNews = async () => {
        try {
            const request = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=6ce1d735abd243319604826699113465')
            const response = await request.json()
            if (response.articles.length > 0) {
                dispatch(STORENEWSDATA(response?.articles))
                setLocalNewsData(response?.articles)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // func to fetch news from local storage
    const fetchLocalNews = () => {
        const newsData = JSON.parse(localStorage.getItem("news"));
        setLocalNewsData(newsData?.news)
    }

    useEffect(() => {
        fetchPopularNews()
        fetchLocalNews()
    }, [])

    return (
        <div className={` ${enabled ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2' : 'flex flex-wrap justify-evenly gap-4'} `}>
            {
                newsDataLocal && newsDataLocal.length > 0 ? (
                    newsDataLocal.map((item, index) => <Card enabled={enabled} key={index} data={item} />)) : "No data found. Also Note: Requests from the browser are not allowed on the Developer plan, except from localhost. That's why unable to fetch data."
            }
        </div>
    )
}

export default Popular