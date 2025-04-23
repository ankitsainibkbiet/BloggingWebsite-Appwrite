import React from "react";
import authService from '../../Appwrite/Auth'
import {useDispatch} from "react-redux"
import {logout} from '../../Slice/AuthSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.userLogout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            onClick={logoutHandler}
            className="hover:bg-gray-300 hover:rounded-md p-1">
            Logout
        </button>
    )
}

export default LogoutBtn