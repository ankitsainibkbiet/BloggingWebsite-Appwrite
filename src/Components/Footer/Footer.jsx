import React from "react";
import { Link } from 'react-router-dom'
import { Logo } from "../index";

function Footer() {
    return (
        <>
            <div className="container">

                <hr className="w-full border border-black" />

                <div className="text-black p-5 flex justify-between bg-[#bbbab8]">

                    <div className="flex flex-col justify-between text-start w-[25rem]">
                        <Link><Logo /></Link>
                        <Link><p>© 2025 χвℓσggєя. All rights reserved.</p></Link>
                    </div>

                    <div className="flex">
                        <div>
                            <h2 className="text-xl font-semibold underline">About <span className="text-4xl font-bold">χвℓσggєя</span></h2>
                            <p className="mt-2 text-start">
                                XBlogger is a platform where you can explore amazing blogs on various topics.
                                Stay informed and inspired with our curated articles.
                            </p>
                        </div>

                        <div className="text-start mx-14">
                            <p className="my-3 font-bold underline">COMPANY</p>
                            <ul className="space-y-5 text-start">
                                <li><Link to='/'>Features</Link></li>
                                <li><Link to='/'>Pricing</Link></li>
                                <li><Link to='/'>Affiliate Program</Link></li>
                                <li><Link to='/'>Press Kit</Link></li>
                            </ul>
                        </div>

                        <div className="text-start mx-14">
                            <p className="my-3 font-bold underline">SUPPORT</p>
                            <ul className="space-y-5 text-start">
                                <li><Link to='/'>Account</Link></li>
                                <li><Link to='/'>Help</Link></li>
                                <li><Link to='/'>Contact Us</Link></li>
                                <li><Link to='/'>Customer Support</Link></li>
                            </ul>
                        </div>

                        <div className="text-start mx-14">
                            <p className="my-3 font-bold underline">LEGALS</p>
                            <ul className="space-y-5 text-start">
                                <li><Link to='/'>Terms & Conditions</Link></li>
                                <li><Link to='/'>Privacy Policy</Link></li>
                                <li><Link to='/'>Licensing</Link></li>
                            </ul>
                        </div>

                        <div className="text-start mx-14">
                            <p className="my-3 font-bold underline text-nowrap">Quick Link</p>
                            <ul className="space-y-5 text-start">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/allPost'>Your Post</Link></li>
                                <li><Link to='/addPost'>Add Post</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Footer