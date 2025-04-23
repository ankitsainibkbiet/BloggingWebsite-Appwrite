import React, { useEffect, useState } from "react";
import databases from '../Appwrite/Databases'
import { PostCard } from "../Components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import img from './bgImg/pexels-ivan-samkov-4240511.jpg'


function Home() {

    const auth = useSelector((state) => state.auth.status)

    const [post, setPost] = useState([])

    useEffect(() => {
        databases.getActivePosts([])
            .then((allPost) => (
                setPost(allPost.documents)
            ))
    }, [])


    if (!auth) {
        return (
            <div className='flex py-12'>

                <div className="left text-start p-8 font-[Helvetica] w-[37%] mt-14">
                    <p className="text-7xl my-5 font-serif italic font-bold">Create a blog</p>
                    <p className="text-2xl font-medium">Share your story with the world. Create a beautiful, personalized blog that fits your brand. Grow your audience with built-in marketing tools, or transform your passion into revenue by gating access with a paywall.</p>
                    <Link to='/signup'><button className="text-xl my-7 p-3 bg-black hover:bg-slate-900 text-white">Get Started</button></Link>
                </div>
                
                <div className="right ml-[23rem]">
                        <img src={img} alt="img" className="h-[37rem]"/>
                    </div>

            </div>
        )
    }

    return (
        <div className="flex flex-wrap w-full min-h-screen px-5 py-10">
            {post.map((posts) => (
                <div key={posts.$id} className='p-2 w-1/4'>
                    <PostCard {...posts} />
                </div>
            ))}
        </div>
    )
}

export default Home