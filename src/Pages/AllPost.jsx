import React, { useEffect, useState } from "react";
import databases from '../Appwrite/Databases'
import { PostCard } from "../Components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postImg from "./bgImg/nopostImg.png"

function AllPost() {
    const [posts, setPosts] = useState([]);  // Use 'posts' as it's an array
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        databases.getActivePosts([])
            .then((response) => {
                setPosts(response.documents);
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    // Filter posts to show only those created by the logged-in user
    const userPosts = posts.filter(post => post.userId === userData?.$id);

    return userPosts.length > 0 ? (
        <div className="flex flex-wrap min-h-screen py-10 px-5">
            {userPosts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    ) : (
        <div className="min-h-screen">
            <p className="text-4xl pt-14 pb-10 font-semibold italic">
                You haven't created any posts yet. Start sharing your thoughts by creating a new post!
            </p>
            <img src={postImg} alt="No Posts" className="ml-[20rem]" />
            <button 
                onClick={() => navigate('/addPost')} 
                className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-4 py-2 my-10 rounded">
                Create Post
            </button>
        </div>
    );
}

export default AllPost;
