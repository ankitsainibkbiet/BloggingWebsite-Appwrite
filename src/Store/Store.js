import {configureStore} from '@reduxjs/toolkit'
import AuthSliceReducer from "../Slice/AuthSlice"

export const Store = configureStore({
    reducer : {
        auth : AuthSliceReducer  // first define name of your slice then reducer
    }
})