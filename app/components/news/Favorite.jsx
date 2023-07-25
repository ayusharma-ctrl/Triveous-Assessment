import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '@/app/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { STORESAVEDNEWS } from '@/app/store/reducers/NewsDataReducer';


const Favorite = () => {
  // state to hold the data of favorite news
  const [newsFavLocal, setNewsFavLocal] = useState([])
  // get data from state
  const userData = useSelector((state) => state.user)
  const preferenceData = useSelector((state) => state.news)
  const enabled = preferenceData?.displayGrid

  const dispatch = useDispatch();

  // func to fetch the news locally
  const fetchFavNews = () => {
    const newsData = JSON.parse(localStorage.getItem("news"));
    setNewsFavLocal(newsData?.savedNews)
  }

  // func to fetch the news from firebase firestore database collection
  const fetchFavoriteNews = async () => {
    try {
      const newsRef = collection(db, "news");
      const q = query(newsRef, where("email", "==", userData?.user?.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        const favNewsData = [];
        querySnapshot.forEach((doc) => {
          favNewsData.push({ ...doc.data() });
        });
        dispatch(STORESAVEDNEWS(favNewsData))
        setNewsFavLocal(favNewsData)
      }

    } catch (error) {
      console.error("Error fetching news data:", error);
    }

  }

  useEffect(() => {
    fetchFavoriteNews()
    fetchFavNews()
  }, [])

  return (
    <div className={` ${enabled ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2' : 'flex flex-wrap justify-evenly gap-4'} `}>
      {
        newsFavLocal && newsFavLocal.length > 0 ? (
          newsFavLocal.map((item, index) => <Card enabled={enabled} key={index} data={item} />)) : "No Saved News"
      }
    </div>
  )
}

export default Favorite