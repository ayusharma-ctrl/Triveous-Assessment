"use client"
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import NewsDataReducer from "./reducers/NewsDataReducer";


//importing all the reducers that we have and exporting them along with a custom name.. 
//we can give any custom name to reducer as well while importing it in store
//Note: we will use this custom name to access store/all the redux states using useSelector
//we can directly import actions from the reducers to make changes
export default configureStore({
    reducer: {
        user: UserReducer,
        news: NewsDataReducer 
    }
})