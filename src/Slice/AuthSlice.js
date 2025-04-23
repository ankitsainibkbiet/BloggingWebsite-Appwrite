import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({

    name: 'auth',  // you can not access the store by this name 

    initialState: {
        status: false,
        userData: null
    },

    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            console.log(state.userData)
        },

        logout: (state, action) => {
            state.status = false
            state.userData = null
        },
    }
})

export const { login, logout } = AuthSlice.actions  // it is actions not action and use (=) equals to symbol

export default AuthSlice.reducer
