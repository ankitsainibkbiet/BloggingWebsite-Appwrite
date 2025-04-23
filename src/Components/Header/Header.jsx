import React from "react";
import { Logo, LogoutBtn } from '../index'
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {

    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: 'Home',
            linkTo: '/',
            active: true
        },

        {
            name: 'Login',
            linkTo: '/login',
            active: !authStatus
        },

        {
            name: 'Signup',
            linkTo: '/signup',
            active: !authStatus
        },

        {
            name: 'Your Post',
            linkTo: '/allPost',
            active: authStatus
        },

        {
            name: 'Add Post',
            linkTo: '/addPost',
            active: authStatus
        },
    ]

    return (
        <div className=" text-black p-5 flex justify-between text-center bg-[#bbbab8] shadow-xl">
            <div className="flex">
                <Link to='/'><Logo className="w-[3rem]" /></Link>
                <span className="pl-2 text-4xl font-bold">χвℓσggєя</span>
            </div>

            <div >
                <ul className="flex space-x-10 font-[500] text-2xl" >
                    {navItems.map((item) =>
                        item.active ? <NavLink to={item.linkTo} key={item.name} className={({ isActive }) => `${isActive ? 'font-bold' : 'null'}`}><li className="hover:bg-gray-300 hover:rounded-md p-1">{item.name}</li></NavLink> : null
                    )}
                    {authStatus ? (<Link><li><LogoutBtn /></li></Link>) : null}
                </ul>
            </div>

        </div>
    )
}

export default Header