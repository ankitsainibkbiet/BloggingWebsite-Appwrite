import React from "react";
import { useState, useEffect } from "react";
import databases from '../Appwrite/Databases';
import { PostForm } from "../Components";
import { useParams } from "react-router-dom";

function EditPost() {

    const [post, setPost] = useState()
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            databases.getPost(slug)
                .then((post) => {
                    setPost(post)
                })
        }
    }, [slug])

    return post ? (
        <div className="py-10 px-5">
            <PostForm post={post} />
        </div>
    ) : null
}

export default EditPost